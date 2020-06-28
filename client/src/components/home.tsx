import './home.css'
import React from "react";
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";

function HomeComponent(props: any) {

    return (
        <div className="home-root text-center">
            <div className="row" style={{display:props.loginState?"block":'none'}}>
                <div className="col-md-12">
                    <span className="home-title">
                        The making of IG Coder
                    </span>
                    <h1 className="home-sub-title">Policy Coding - We're trying to make it work!</h1>
                    <Link to="/projects/myprojects">
                        <button className="btn btn-dark">Browse all your projects</button>
                    </Link>
                </div>
            </div>
            <div className={"row"} style={{display:!props.loginState?"block":'none'}}>
                <div className={'col'}>
                    <h1 className="home-sub-title">YOU ARE NOT SIGNED IN, PLEASE LOGIN FIRST!</h1>
                    <img src={"https://media.giphy.com/media/MC6eSuC3yypCU/giphy.gif"} alt={''}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    loginState: state.reducer.loginState
});

export default connect(mapStateToProps,null)(HomeComponent);
