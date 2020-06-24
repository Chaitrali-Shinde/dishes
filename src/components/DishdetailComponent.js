import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap';
import {Link} from 'react-router-dom'

    

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

export default DishDetail