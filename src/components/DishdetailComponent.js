import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb, Button, ModalHeader, Modal, ModalBody, Form, FormGroup, Label, Col } from 'reactstrap';
import {Link} from 'react-router-dom'
import {Control, Errors, LocalForm} from 'react-redux-form'

const maxLength= (len)=> (val)=> !(val) || (val.length<= len);
const minLength= (len)=> (val)=> (val) && (val.length>= len);
    

function RenderDish({dish}) {
            return(
                <div>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
}

function RenderComments({comments}){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
        if(comments!=null){
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className= "list-unstyled">
                        {comments.map((comment)=>{
                            return(
                                <li key={comment.id}>
                               <p>{comment.comment}</p>
                            <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <CommentForm/>
                </div>
               
            );
        }
        else{
            return(
                <div></div>
            );
        }

}


const DishDetail=(props)=>{
      
        if(props.dish!=null)
        {
            return(
                <div className= "row">
                    <div className= "container">
                     <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to= "/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to= "/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className= "col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                    <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
                    </div>
                    </div>
                </div>
                
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
    }

    export class CommentForm extends React.Component{

        constructor(props){
            super(props);
            this.state={
                isModalOpen: false
              };
              this.toggleModal= this.toggleModal.bind(this);
              this.handleSubmit= this.handleSubmit.bind(this);
        }


  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values){
    console.log("Current state is:"+ JSON.stringify(values));
    alert("Current state is:"+ JSON.stringify(values));
}

        render(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle= {this.toggleModal}>
                        <ModalHeader toggle= {this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor= "rating" md= {2}>
                                    Rating
                                </Label>
                                <Col md={10}>
                                    <Control.select model= ".rating" id= "rating" name= "rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor= "name" md= {2}>
                                    Name
                                </Label>
                                <Col md={10}>
                                    <Control.text model= ".name" id= "name" name= "name"
                                            placeholder= "Name" 
                                            className= "form-control"
                                            validators= {
                                                {
                                                     minLength: minLength(3), maxLength: maxLength(15)
                                                }
                                            }
                                            />
                                        <Errors
                                        className= "text-danger"
                                        model= ".name"
                                        show= "touched"
                                        messages= {{
                                            minLength: 'length show be greater than 2',
                                            maxLength: 'length should be less than 15'
                                        }}/>
                                    
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor= "comment" md= {2}>
                                    Comment
                                </Label>
                                <Col md={10}>
                                    <Control.textarea model= ".comment" id= "comment" name= "comment"
                                            placeholder= "Comment" 
                                            className= "form-control"
                                            />
                                   
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md= {{size:10, offset: 2}}>
                                    <Button type= "submit" color= "primary">Send Feedback</Button>
                                </Col>
                            </FormGroup>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
    }

export default DishDetail