import Document from "../model/document";

const testDocumentString = `
    {
      "name": "Tutorial",
      "description": "",
      "id": 1,
      "entries": [
        {
          "id": 1,
          "document": 1,
          "original": "Certified farmers must strictly adhere to organic farming practices following their certification.",
          "rephrased": "Certified (A,prop) farmers (A) must (D) strictly (Cex) adhere (I) to organic farming practices (Bdir) following their certification (Cac)."
        },
        {
          "id": 2,
          "document": 1,
          "original": "A certified farmer whose certification is suspended by the Secretary under this section may at any time submit a recertification request.",
          "rephrased": "A certified (A,prop1) farmer (A) {whose certification (Bdir) is suspended [suspends (I)] by the Secretary (A) under this section (Cex)}(A,prop2) may (D) at any time (Cac) submit (I) a recertification (Bdir,prop) request (Bdir)."
        },
        {
          "id": 3,
          "document": 1,
          "original": "The Program Manager shall send a written notification of proposed suspension or revocation of certification to certified organic farmer.",
          "rephrased": "The Program Manager (A) shall (D) send (I) a written (Bdir,prop) notification (Bdir) of proposed (Ba,1,prop; Ba,2,prop) suspension (Ba,1) or revocation (Ba,2) of certification (Ba) to certified (Bind,prop1) organic (Bind,prop2) farmer (Bind)."
        },
        {
          "id": 4,
          "document": 1,
          "original": "Upon entrance into agreement with organic farmer to serve as his/her certifying agent, organic certifier must inspect farmer’s operation within 60 days.",
          "rephrased": "Organic certifier (A) must (D) inspect (I) farmer’s operation (Bdir) within 60 days (Cex,tfr) under the condition {that the organic farmer (A) enters (I) an agreement (Bdir) with the organic certifier (Bind) to serve as his/her certifying agent (Cex,pur)}(Cac,prc)."
        },
        {
          "id": 5,
          "document": 1,
          "original": "No member of the Council shall be disqualified from holding any public office or employment.",
          "rephrased": "No (NOT) member (E) of the Council (E,prop) shall (M) be (F) disqualified from holding any public office or employment (P)."
        }
      ],
      "entryMap": {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        "5": 4
      }
    }
`;

export const testDocumentVideo = Document.fromData(JSON.parse(testDocumentString) as Document);
