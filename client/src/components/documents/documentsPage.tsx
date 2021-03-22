import React from "react";
import {useState, useEffect} from "react";
import {withRouter, Link} from "react-router-dom";
import "./documentsPage.css";
import LeftTab from "../common/leftTab";
import { Typography, Breadcrumbs } from '@material-ui/core';
import ListItem from "../common/listItem";
import {connect} from "react-redux";
import pageTitles from "../../core/config/pageTitles";
import NewDocumentContainer from "./newDocumentContainer";

function DocumentsPage(props) {
    useEffect(() => {
        document.title = pageTitles.prefix + pageTitles.myDocuments;
    });

    const { match: { params: {tab, projectid}} } = props;

    const [newDocumentDialog, setNewDocumentDialog] = useState(false);

    const openNewDocumentDialog = () => {
        setNewDocumentDialog(true)

    }
    const closeNewDocumentDialog = () => {
        setNewDocumentDialog(false);
    }

    let title
    var fakedatas = [
        [
        {
            title: "画ロジェクト像の投票",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Jenna Fields",
            date: 3
        },
        {
            title: "娯楽とスポーツ",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Esme Daniels",
            date: 4
        },
        {
            title: "元素記号はEs",
            des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                "Très parce que car dire parce que pour vin fromage et aussi car.",
            type: "project",
            author: "Hasan Carver",
            date: 1
        },
    ],
        [
            {
                title: "熊谷氏の後裔とされる",
                des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                    "Très parce que car dire parce que pour vin fromage et aussi car.",
                type: "document",
                author: "Luke Mccann",
                date: 3
            },
            {
                title: "日本の氏族の一つ",
                des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                    "Très parce que car dire parce que pour vin fromage et aussi car.",
                type: "document",
                author: "William Marsh",
                date: 4
            },
            {
                title: "ウィキメディアプロジェクト",
                des: "Que du coup très carrément manger du coup voir manger tout voila devoir omelette. " +
                    "Très parce que car dire parce que pour vin fromage et aussi car.",
                type: "document",
                author: "Raphael Tran",
                date: 1
            },
        ]
    ]
    let fakedata=fakedatas[0]
    switch (tab) {
        case 'all':
            title = 'All Documents';
            fakedata = fakedatas[0]
            break
        case 'recent':
            title = 'Recent Documents';
            fakedata = fakedatas[1]
            break
        default:
            break;
    }

    return (
        <div className={'root'}>
            <div className={'Container'}>
                <div className={"row-auto"}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/projects/myprojects">
                            My projects
                        </Link>
                        <Typography color="textPrimary" className={"link"}>
                            {projectid}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="row">
                    <div className="col-auto mr-auto">
                        <h3>{projectid}</h3>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" onClick={openNewDocumentDialog}
                                data-target="#exampleModalCenter">New Document
                        </button>
                        <NewDocumentContainer dialogOpen={newDocumentDialog} handleClose={closeNewDocumentDialog}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 " id={"lefttab"}>
                        <div className="list-group">
                            <Link to="./all" className="list-group-item list-group-item-action"
                               style={tab === 'all' ? {backgroundColor: '#EBEDEF'} : {backgroundColor: 'None'}}>
                                <LeftTab title={"My documents"} des={'All my documents'}>
                                    <svg width="2em" height="2em" viewBox="0 0 16 16"
                                         className="bi bi-file-earmark-text" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"/>
                                        <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z"/>
                                        <path fillRule="evenodd"
                                              d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </LeftTab>
                            </Link>
                            <Link to="./recent" className="list-group-item list-group-item-action"
                               style={tab === 'recent' ? {backgroundColor: '#EBEDEF'} : {backgroundColor: 'None'}}>
                                <LeftTab title={"Recent documents"} des={'Browse documents recently opened'}>
                                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-clock-history"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                        <path fillRule="evenodd"
                                              d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                        <path fillRule="evenodd"
                                              d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </LeftTab>
                            </Link>
                        </div>

                    </div>
                    <div className="col-auto" id={"verticalline"}>
                        <div className={'vertical-line'}/>
                    </div>
                    <div className="col">
                        <div className="row align-items-center">
                            <div className="col-auto mr-auto">
                                <h4>{title}</h4>
                            </div>
                            <div className="col-auto">
                                <div className="search">
                                    <input type="text" className="form-control" placeholder="Search" name="ig-q"/>
                                    <span className="dark-igc-gray-text oi oi-magnifying-glass"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'horizontal-line'}/>
                        </div>


                        <div className="row-auto">
                            <div className="list-group" id={'file-list'}>
                                {fakedata.map(data => {
                                    return (
                                        <Link to="#1" key={data.title}
                                           className="list-group-item list-group-item-action">
                                            <ListItem
                                                title={data.title}
                                                type={data.type}
                                                author={data.author}
                                                modified date={"Modified " + data.date + " days ago"}
                                            />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default connect(null,null)(withRouter(DocumentsPage))
