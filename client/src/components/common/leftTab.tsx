import React from "react";
import './leftTab.css'

export default function LeftTab(props:any) {
    const title=props.title
    const des=props.des

    return(
        <div className={'container left-tb-root'}>
            <div className={'row align-items-center justify-content-start'}>
                <div className={'col-2 icon'}>
                    {props.children}
                </div>
                <div className={'col-8'}>
                    <div className={'row title'}>
                        <h5>{title}</h5>
                    </div>
                    <div className={'row des'}>
                        {des}
                    </div>
                </div>
            </div>
        </div>
    );
}
