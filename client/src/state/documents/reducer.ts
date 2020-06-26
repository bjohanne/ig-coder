import update from 'immutability-helper';
import {
    GET_DOCUMENT_RESPONSE,
    CREATE_DOCUMENT_RESPONSE,
    ADD_ENTRY_TO_DOCUMENT,
    SET_ACTIVE_NODE,
    UPDATE_ENTRY,
    ADD_JUNCTION,
    UPDATE_JUNCTION,
    UPDATE_NEGATION
} from "./actions";

import Document from "../../core/model/document";
import { NormNode, ConventionNode, JunctionNode, NegationNode } from '../../core/model/nodes';
import { Arg } from '../../core/model/enums';
import { INode } from '../../core/model/interfaces';

interface IInitialState {
    documents: Array<Document>,
    currentDocument: Document | null
    activeNode: any
}

const initialState: IInitialState = {
    documents: [],
    currentDocument: null,
    activeNode: null
};

const documentReducer = (state: any = initialState, action: any) => {
    let currentDocument: Document;
    let newDocument: Document;
    let node: INode;
    switch (action.type) {
        case GET_DOCUMENT_RESPONSE:
			// Here, we could check whether the existing currentDocument is identical to the new one.
            // But maybe such a comparison is expensive, and we might as well just always overwrite.
            currentDocument = new Document(action.payload.name, action.payload.description, action.payload.id, action.payload.forest);
            return update(state, {currentDocument: {$set: currentDocument}});
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
        case CREATE_DOCUMENT_RESPONSE:
			let document = new Document(action.payload.name, action.payload.description, action.payload.id);
            return update(state, {documents: {$push: [document]}, currentDocument: {$set: document}});
        case UPDATE_ENTRY:
            state.currentDocument.updateNode(action.payload);
            let nDoc = Object.assign(new Document("", "", -1), state.currentDocument);
            return update(state, {currentDocument: { $set: nDoc } });
        case "persist/REHYDRATE":
			// This is a "manual override" for rehydrating Redux state from local storage. Happens on page load/refresh.

            if (!action.payload) {
                return state;
            }

			// Rehydrate documents array
			let origList = action.payload.documentReducer.documents;
			let dlist = [];
			if (origList && origList.length > 0) {
				origList.forEach((d: Document) => {
					dlist.push(new Document(d.name, d.description, d.id, d.forest));
				});
			}

			// Rehydrate current document
            let d = action.payload.documentReducer.currentDocument;
	        let rebuiltDoc;
			if (d) {
				rebuiltDoc = new Document(d.name, d.description, d.id, d.forest);
			}

			console.log(dlist);

		    return update(state, {documents: {$set: dlist}, currentDocument: { $set: rebuiltDoc }})
        default:
            return state;
    }
};

export default documentReducer;
