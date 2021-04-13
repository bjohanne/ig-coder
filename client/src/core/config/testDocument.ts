import Document from "../model/document";

const testDocumentString = `
    {
      "name": "Policy Coding Test",
      "description": "",
      "id": 1,
      "entries": [
        {
          "id": 1,
          "document": 1,
          "original": "American homeowners mow their lawns.",
          "rephrased": ""
        },
        {
          "id": 2,
          "document": 1,
          "original": "Dog owners pick up after their dogs.",
          "rephrased": ""
        },
        {
          "id": 3,
          "document": 1,
          "original": "The Commission may appoint its own Secretary and staff.",
          "rephrased": ""
        },
        {
          "id": 4,
          "document": 1,
          "original": "For the purposes of this Act, working hours means time when the employee is at the disposal of the employer.",
          "rephrased": ""
        },
        {
          "id": 5,
          "document": 1,
          "original": "Normal working hours must not exceed nine hours per 24 hours and 40 hours per seven days.",
          "rephrased": ""
        },
        {
          "id": 6,
          "document": 1,
          "original": "The Ministry may issue regulations with further provisions concerning the activities of the committee, including provisions concerning procedure and concerning the duty of secrecy for members of the committee.",
          "rephrased": ""
        },
        {
          "id": 7,
          "document": 1,
          "original": "“Contracting Government” means any Government which has deposited an instrument of ratification or has given notice of adherence to this Convention.",
          "rephrased": ""
        },
        {
          "id": 8,
          "document": 1,
          "original": "Night work is not permitted unless necessitated by the nature of the work.",
          "rephrased": ""
        },
        {
          "id": 9,
          "document": 1,
          "original": "The employer and the employee may agree in writing that overtime hours shall wholly or partly be taken out as off-duty time on agreed dates.",
          "rephrased": ""
        },
        {
          "id": 10,
          "document": 1,
          "original": "The Commission may set up, from among its own members and experts or advisers, such committees as it considers desirable to perform such functions as it may authorize.",
          "rephrased": ""
        },
        {
          "id": 11,
          "document": 1,
          "original": "All male U.S. citizens, 18 years of age and older, must register with the Selective Service by filling out a form at the U.S. Post Office or else face arrest for evading registration.",
          "rephrased": ""
        },
        {
          "id": 12,
          "document": 1,
          "original": "Certified organic farmers must not apply synthetic chemicals to crops at any time once organic certification is conferred, or else certifier will administer official notice of noncompliance and revoke or suspend certification of farmer.",
          "rephrased": ""
        },
        {
          "id": 13,
          "document": 1,
          "original": "Employees who have children in their care are entitled to leave of absence:\\na) when necessary to attend a sick child,\\nb) if a child shall be accompanied to a medical examination or other follow-up in connection with sickness, or\\nc) if the person responsible for the daily childcare is sick or has leave of absence pursuant to this section owing to another child.",
          "rephrased": ""
        },
        {
          "id": 14,
          "document": 1,
          "original": "Such notification shall provide:\\n(1) A description of each noncompliance;\\n(2) The facts upon which the notification of noncompliance is based; and\\n(3) The date by which the certifying agent must rebut or correct each noncompliance and submit supporting documentation of each correction when correction is possible.",
          "rephrased": ""
        },
        {
          "id": 15,
          "document": 1,
          "original": "Drivers must hand their driver’s license to the police officer when stopped in traffic control, or else the police officer must enforce this under any circumstances and, depending on severity, must either fine the driver or arrest him, or else internal investigators must follow up on this issue in any case.",
          "rephrased": ""
        }
      ],
      "entryMap": {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        "5": 4,
        "6": 5,
        "7": 6,
        "8": 7,
        "9": 8,
        "10": 9,
        "11": 10,
        "12": 11,
        "13": 12,
        "14": 13,
        "15": 14
      }
    }
`;

export const testDocument = Document.fromData(JSON.parse(testDocumentString) as Document);
