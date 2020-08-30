import update from 'immutability-helper';
import {
    GET_DOCUMENT_RESPONSE,
    GET_DOCUMENT_RESPONSE_FETCHED,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY,
    ADD_JUNCTION,
    UPDATE_JUNCTION,
    UPDATE_NEGATION
} from "./actions";

import { API_CALL_BEGIN, API_CALL_SUCCESS, API_CALL_ERROR } from "../apiCall/actions";

import Document from "../../core/model/document";
import { NormNode, ConventionNode, JunctionNode, NegationNode } from '../../core/model/nodes';
import { Arg } from '../../core/model/enums';
import { INode } from '../../core/model/interfaces';

interface IDocumentState {
    documentList: Array<Document>,
    currentDocument: Document | null,
    activeNode: any,
    loading: Boolean,
    error: any
}

const initialState: IDocumentState = {
    documentList: [],
    currentDocument: null,
    activeNode: null,
    loading: false,
    error: null
};

const documents = (state: IDocumentState = initialState, action: any) => {
    let currentDocument: Document;
    let newDocument: Document;
    let node: INode;
    switch (action.type) {
        case API_CALL_BEGIN:
            return update(state, {
                loading: {$set: true},
                error: {$set: null}
            });
        case API_CALL_SUCCESS:
            return update(state, {
                loading: {$set: false},
                error: {$set: null}
            });
        case API_CALL_ERROR:
            return update(state, {
                loading: {$set: false},
                error: {$set: action.error}
            });
        case GET_DOCUMENT_RESPONSE:
            return update(state, {currentDocument: {$set: action.payload}});
        case GET_DOCUMENT_RESPONSE_FETCHED:
            return update(state, {documentList: {$push: [action.payload]}, currentDocument: {$set: action.payload}});
        case CREATE_DOCUMENT_RESPONSE:
            return update(state, {documentList: {$push: [action.doc]}, currentDocument: {$set: action.doc}});
        case ADD_JUNCTION:
            node = action.payload as INode;
            currentDocument = state.currentDocument as Document;
            currentDocument.forest[0].updatedAt = new Date();
            currentDocument.updateNode(node);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});
        case UPDATE_JUNCTION:
            let junctionNode = action.payload.node as JunctionNode;
            currentDocument = state.currentDocument as Document;
            currentDocument.forest[0].updatedAt = new Date();
            junctionNode.setJunction(action.payload.junctionType);
            currentDocument.updateNode(junctionNode);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});

        case UPDATE_NEGATION:
            let negationNode = action.payload.node as NegationNode;
            currentDocument = state.currentDocument as Document;
            currentDocument.forest[0].updatedAt = new Date();
            currentDocument.updateNode(negationNode);
            newDocument = Object.assign(new Document("", "", -1), currentDocument);
            return update(state, {currentDocument: {$set: newDocument }});

        case ADD_ENTRY_TO_DOCUMENT:
            if(state.currentDocument.forest.length === 0) { // NB: Change this when allowing multiple entries per document
                let doc = new Document(state.currentDocument.name, state.currentDocument.description, state.currentDocument.id);
                doc.createTree(action.payload.hasDeontic ? Arg.norm : Arg.convention, action.payload.content);
				let root = (action.payload.hasDeontic) ? doc.getRoot() as NormNode : doc.getRoot() as ConventionNode;
				root.createObject();

				/*
				// Below is development stuff - building an example tree to demonstrate the different node types
				doc.addSanctionNodeToTree(0);
				let root = doc.getRoot() as SanctionNode;
				let norm = root.getLeft() as NormNode;	// Actually a Convention node, maybe
				doc.turnOnNegation(norm, 0);
				norm.setEntry("The Program Manager may not initiate suspension or revocation proceedings against a certified operation.");
				let obj = norm.createObject() as ComponentNode;
				let attr = norm.getAttributes() as ComponentNode;
				attr.setContent("Program Manager", "The");
				let dirObj = obj.getLeft() as SubcomponentNode;
				let jun = dirObj.createJunctionNode() as JunctionNode;
				jun.setJunction(JunctionType.xor);
				let left = jun.createSubcomponentNode(SubcomponentType.direct, Arg.left) as SubcomponentNode;
				left.setContent("suspension");
				let right = jun.createSubcomponentNode(SubcomponentType.direct, Arg.right) as SubcomponentNode;
				right.setContent("revocation proceedings");
				let indirObj = obj.getRight() as SubcomponentNode;
				let only = indirObj.createSubcomponentNode(SubcomponentType.indirect, Arg.only) as SubcomponentNode;
				only.setContent("a certified operation");
				let aim = norm.getAim() as ComponentNode;
				aim.setContent("initiate");
				// End dev stuff
				*/

				return update(state, { currentDocument: { $set: doc }});
			} else {
				return state;
			}
        case SET_ACTIVE_NODE:
            return update(state, { activeNode: { $set: action.payload }});
        case UPDATE_ENTRY:
            state.currentDocument.updateNode(action.payload);
            let nDoc = Object.assign(new Document("", "", -1), state.currentDocument);
            return update(state, {currentDocument: { $set: nDoc } });
        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.

            if (action.key !== "documents") {
                return state;
            }

            if (!action.payload) {
                return state;
            }

			// Rehydrate documents array
			let origList = action.payload.documentList;
			let dlist = [];
			if (origList && origList.length > 0) {
				origList.forEach((d: Document) => {
					dlist.push(new Document(d.name, d.description, d.id, d.forest));
				});
			}

			// Rehydrate current document
            let d = action.payload.currentDocument;
	        let rebuiltDoc;
			if (d) {
				rebuiltDoc = new Document(d.name, d.description, d.id, d.forest);
			}

		    return update(state, {documentList: {$set: dlist}, currentDocument: { $set: rebuiltDoc }})
        default:
            return state;
    }
};

export default documents;
