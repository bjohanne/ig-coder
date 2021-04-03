import Document from "../model/document";

// This is where you add sample statements when they're ready. Each statement goes in the `original` key.
// Remember to update entryMap.
// Name and description will be shown to the user.

const testDocumentString = `{
	"name": "Policy Coding Test",
	"description": "",
	"id": "1",
	"entries": [
        {
          "id": 1,
          "document": 1,
          "original": "The Program Manager may initiate suspension or revocation proceedings against a certified operation: (1) When the Program Manager has reason to believe that a certified operation has violated or is not in compliance with the Act or regulations in this part; or (2) When a certifying agent or a State organic program's governing State official fails to take appropriate action to enforce the Act or regulations in this part.",
          "root": {
            "id": 2,
            "document": 1,
            "nodeType": "Regulative Statement",
            "contextType": "tmp",
            "isNegated": false,
            "createdAt": "2021-03-24T20:04:38.506Z",
            "updatedAt": "2021-03-24T20:04:38.507Z",
            "children": [
              {
                "id": 3,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z",
                "children": [],
                "componentType": "Attribute",
                "text": {
                  "main": "Program Manager",
                  "prefix": "The"
                }
              },
              {
                "id": 13,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z",
                "children": [],
                "componentType": "Deontic",
                "text": {
                  "main": "may"
                }
              },
              {
                "id": 5,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z",
                "children": [],
                "componentType": "Aim",
                "text": {
                  "main": "initiate"
                }
              },
              {
                "id": 14,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z",
                "children": [
                  {
                    "id": 15,
                    "document": 1,
                    "nodeType": "Property Junction",
                    "isNegated": false,
                    "parent": 14,
                    "createdAt": "2021-03-24T20:04:38.506Z",
                    "updatedAt": "2021-03-24T20:04:38.506Z",
                    "children": [
                      {
                        "id": 18,
                        "document": 1,
                        "nodeType": "Property",
                        "isNegated": false,
                        "parent": 15,
                        "createdAt": "2021-03-24T20:04:38.506Z",
                        "updatedAt": "2021-03-24T20:04:38.506Z",
                        "children": [],
                        "text": {
                          "main": "suspension"
                        },
                        "isFunctionallyDependent": false
                      },
                      {
                        "id": 19,
                        "document": 1,
                        "nodeType": "Property",
                        "isNegated": false,
                        "parent": 15,
                        "createdAt": "2021-03-24T20:04:38.506Z",
                        "updatedAt": "2021-03-24T20:04:38.506Z",
                        "children": [],
                        "text": {
                          "main": "revocation"
                        },
                        "isFunctionallyDependent": false
                      }
                    ],
                    "junctionType": "XOR",
                    "text": {
                      "main": "or"
                    },
                    "isFunctionallyDependent": false
                  }
                ],
                "componentType": "Direct Object",
                "text": {
                  "main": "proceedings"
                }
              },
              {
                "id": 20,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.507Z",
                "updatedAt": "2021-03-24T20:04:38.507Z",
                "children": [
                  {
                    "id": 21,
                    "document": 1,
                    "nodeType": "Property",
                    "isNegated": false,
                    "parent": 20,
                    "createdAt": "2021-03-24T20:04:38.507Z",
                    "updatedAt": "2021-03-24T20:04:38.507Z",
                    "children": [],
                    "text": {
                      "main": "certified"
                    },
                    "isFunctionallyDependent": false
                  }
                ],
                "componentType": "Indirect Object",
                "text": {
                  "main": "operation",
                  "prefix": "against a"
                }
              },
              {
                "id": 8,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.507Z",
                "children": [
                  {
                    "id": 22,
                    "document": 1,
                    "nodeType": "Statement Junction",
                    "isNegated": false,
                    "parent": 8,
                    "createdAt": "2021-03-24T20:04:38.507Z",
                    "updatedAt": "2021-03-24T20:04:38.507Z",
                    "children": [
                      {
                        "id": 25,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 22,
                        "createdAt": "2021-03-24T20:04:38.507Z",
                        "updatedAt": "2021-03-24T20:04:38.507Z",
                        "children": [
                          {
                            "id": 26,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [],
                            "componentType": "Attribute",
                            "text": {
                              "main": "Program Manager",
                              "prefix": "the"
                            }
                          },
                          {
                            "id": 27,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          },
                          {
                            "id": 28,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "has reason to believe",
                              "suffix": "that",
                              "rephrased": "suspects"
                            }
                          },
                          {
                            "id": 36,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 37,
                                "document": 1,
                                "nodeType": "Regulative Statement",
                                "isNegated": false,
                                "parent": 36,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [
                                  {
                                    "id": 38,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 48,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 38,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "text": {
                                          "main": "certified"
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "operation",
                                      "prefix": "a"
                                    }
                                  },
                                  {
                                    "id": 39,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z"
                                  },
                                  {
                                    "id": 40,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 56,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 40,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [
                                          {
                                            "id": 59,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 56,
                                            "createdAt": "2021-03-24T20:04:38.507Z",
                                            "updatedAt": "2021-03-24T20:04:38.507Z",
                                            "children": [],
                                            "componentType": "Aim",
                                            "text": {
                                              "main": "has violated"
                                            }
                                          },
                                          {
                                            "id": 60,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": true,
                                            "parent": 56,
                                            "createdAt": "2021-03-24T20:04:38.507Z",
                                            "updatedAt": "2021-03-24T20:04:38.507Z",
                                            "children": [],
                                            "componentType": "Aim",
                                            "text": {
                                              "main": "is not in compliance"
                                            }
                                          }
                                        ],
                                        "junctionType": "OR",
                                        "text": {
                                          "main": "or"
                                        },
                                        "componentType": "Aim"
                                      }
                                    ],
                                    "componentType": "Aim",
                                    "text": {}
                                  },
                                  {
                                    "id": 49,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 50,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 49,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [
                                          {
                                            "id": 53,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 50,
                                            "createdAt": "2021-03-24T20:04:38.507Z",
                                            "updatedAt": "2021-03-24T20:04:38.507Z",
                                            "children": [],
                                            "componentType": "Direct Object",
                                            "text": {
                                              "main": "Act",
                                              "prefix": "the"
                                            }
                                          },
                                          {
                                            "id": 54,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 50,
                                            "createdAt": "2021-03-24T20:04:38.507Z",
                                            "updatedAt": "2021-03-24T20:04:38.507Z",
                                            "children": [
                                              {
                                                "id": 55,
                                                "document": 1,
                                                "nodeType": "Property",
                                                "isNegated": false,
                                                "parent": 54,
                                                "createdAt": "2021-03-24T20:04:38.507Z",
                                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                                "children": [],
                                                "text": {
                                                  "main": "in this part"
                                                },
                                                "isFunctionallyDependent": false
                                              }
                                            ],
                                            "componentType": "Direct Object",
                                            "text": {
                                              "main": "regulations"
                                            }
                                          }
                                        ],
                                        "junctionType": "OR",
                                        "text": {
                                          "main": "or"
                                        },
                                        "componentType": "Direct Object"
                                      }
                                    ],
                                    "componentType": "Direct Object",
                                    "text": {}
                                  },
                                  {
                                    "id": 42,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z"
                                  },
                                  {
                                    "id": 43,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 44,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 43,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "componentType": "Simple Context",
                                        "text": {
                                          "main": "under all circumstances"
                                        }
                                      }
                                    ],
                                    "componentType": "Activation Conditions",
                                    "text": {}
                                  },
                                  {
                                    "id": 45,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 46,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 45,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "componentType": "Simple Context",
                                        "text": {
                                          "main": "no constraints"
                                        }
                                      }
                                    ],
                                    "componentType": "Execution Constraints",
                                    "text": {}
                                  },
                                  {
                                    "id": 47,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z"
                                  }
                                ]
                              }
                            ],
                            "componentType": "Direct Object",
                            "text": {}
                          },
                          {
                            "id": 30,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          },
                          {
                            "id": 31,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 32,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 31,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "under all circumstances"
                                }
                              }
                            ],
                            "componentType": "Activation Conditions",
                            "text": {}
                          },
                          {
                            "id": 33,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 34,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 33,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "no constraints"
                                }
                              }
                            ],
                            "componentType": "Execution Constraints",
                            "text": {}
                          },
                          {
                            "id": 35,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          }
                        ]
                      },
                      {
                        "id": 61,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 22,
                        "createdAt": "2021-03-24T20:04:38.507Z",
                        "updatedAt": "2021-03-24T20:04:38.507Z",
                        "children": [
                          {
                            "id": 62,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 72,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 62,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [
                                  {
                                    "id": 75,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 72,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 77,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 75,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "text": {
                                          "main": "certifying"
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "agent",
                                      "prefix": "a"
                                    }
                                  },
                                  {
                                    "id": 76,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 72,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 78,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 76,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "text": {
                                          "main": "State organic program's"
                                        },
                                        "isFunctionallyDependent": false
                                      },
                                      {
                                        "id": 79,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 76,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "text": {
                                          "main": "governing"
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "State official",
                                      "prefix": "a"
                                    }
                                  }
                                ],
                                "junctionType": "OR",
                                "text": {
                                  "main": "or"
                                },
                                "componentType": "Attribute"
                              }
                            ],
                            "componentType": "Attribute",
                            "text": {}
                          },
                          {
                            "id": 63,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          },
                          {
                            "id": 64,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": true,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "fails to take appropriate action to enforce",
                              "rephrased": "fails to enforce"
                            }
                          },
                          {
                            "id": 80,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 81,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 80,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [
                                  {
                                    "id": 84,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 81,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "Act",
                                      "prefix": "the"
                                    }
                                  },
                                  {
                                    "id": 85,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 81,
                                    "createdAt": "2021-03-24T20:04:38.507Z",
                                    "updatedAt": "2021-03-24T20:04:38.507Z",
                                    "children": [
                                      {
                                        "id": 86,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 85,
                                        "createdAt": "2021-03-24T20:04:38.507Z",
                                        "updatedAt": "2021-03-24T20:04:38.507Z",
                                        "children": [],
                                        "text": {
                                          "main": "in this part"
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "regulations"
                                    }
                                  }
                                ],
                                "junctionType": "OR",
                                "text": {
                                  "main": "or"
                                },
                                "componentType": "Direct Object"
                              }
                            ],
                            "componentType": "Direct Object",
                            "text": {}
                          },
                          {
                            "id": 66,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          },
                          {
                            "id": 67,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 68,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 67,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "under all circumstances"
                                }
                              }
                            ],
                            "componentType": "Activation Conditions",
                            "text": {}
                          },
                          {
                            "id": 69,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z",
                            "children": [
                              {
                                "id": 70,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 69,
                                "createdAt": "2021-03-24T20:04:38.507Z",
                                "updatedAt": "2021-03-24T20:04:38.507Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "no constraints"
                                }
                              }
                            ],
                            "componentType": "Execution Constraints",
                            "text": {}
                          },
                          {
                            "id": 71,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-03-24T20:04:38.507Z",
                            "updatedAt": "2021-03-24T20:04:38.507Z"
                          }
                        ]
                      }
                    ],
                    "junctionType": "OR",
                    "text": {
                      "main": "or"
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {}
              },
              {
                "id": 10,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z",
                "children": [
                  {
                    "id": 11,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 10,
                    "createdAt": "2021-03-24T20:04:38.506Z",
                    "updatedAt": "2021-03-24T20:04:38.506Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "no constraints"
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {}
              },
              {
                "id": 12,
                "document": 1,
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:04:38.506Z",
                "updatedAt": "2021-03-24T20:04:38.506Z"
              }
            ]
          }
        },

        
        
        
        
        
        
        
        
        

        {
          "id": 2,
          "document": 1,
          "original": "From 1st of January onward, food preparation guidelines must adhere to national standards, in addition to communal provisions.",
          "root": {
            "id": 2,
            "document": 1,
            "nodeType": "Constitutive Statement",
            "isNegated": false,
            "createdAt": "2021-03-24T20:07:33.586Z",
            "updatedAt": "2021-03-24T20:07:33.586Z",
            "children": [
              {
                "id": 3,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [],
                "componentType": "Constituted Entity",
                "text": {
                  "main": "food preparation guidelines"
                }
              },
              {
                "id": 12,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [],
                "componentType": "Modal",
                "text": {
                  "main": "must"
                }
              },
              {
                "id": 5,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [],
                "componentType": "Constitutive Function",
                "text": {
                  "main": "adhere",
                  "suffix": "to"
                }
              },
              {
                "id": 13,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [],
                "componentType": "Constituting Properties",
                "text": {
                  "main": "national standards"
                }
              },
              {
                "id": 7,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [
                  {
                    "id": 14,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 7,
                    "createdAt": "2021-03-24T20:07:33.586Z",
                    "updatedAt": "2021-03-24T20:07:33.586Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "From 1st of January onward"
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {}
              },
              {
                "id": 9,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z",
                "children": [
                  {
                    "id": 15,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 9,
                    "createdAt": "2021-03-24T20:07:33.586Z",
                    "updatedAt": "2021-03-24T20:07:33.586Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "communal provisions",
                      "prefix": "in addition to"
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {}
              },
              {
                "id": 11,
                "document": 1,
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-03-24T20:07:33.586Z",
                "updatedAt": "2021-03-24T20:07:33.586Z"
              }
            ]
          }
        },
		
		
		
		
		
		
		
		
		
        {
          "id": 87,
          "document": 1,
          "original": "Organic farmers must comply with organic farming regulations, or else certifiers must revoke the organic farming certification.",
          "root": {
            "id": 88,
            "document": 1,
            "nodeType": "Regulative Statement",
            "isNegated": false,
            "createdAt": "2021-03-24T20:09:12.337Z",
            "updatedAt": "2021-03-24T20:09:12.337Z",
            "children": [
              {
                "id": 89,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [],
                "componentType": "Attribute",
                "text": {
                  "main": "Organic farmers"
                }
              },
              {
                "id": 99,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [],
                "componentType": "Deontic",
                "text": {
                  "main": "must"
                }
              },
              {
                "id": 91,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [],
                "componentType": "Aim",
                "text": {
                  "main": "comply",
                  "suffix": "with"
                }
              },
              {
                "id": 100,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [],
                "componentType": "Direct Object",
                "text": {
                  "main": "organic farming regulations"
                }
              },
              {
                "id": 93,
                "document": 1,
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z"
              },
              {
                "id": 94,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [
                  {
                    "id": 95,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 94,
                    "createdAt": "2021-03-24T20:09:12.337Z",
                    "updatedAt": "2021-03-24T20:09:12.337Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "under all circumstances"
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {}
              },
              {
                "id": 96,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [
                  {
                    "id": 97,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 96,
                    "createdAt": "2021-03-24T20:09:12.337Z",
                    "updatedAt": "2021-03-24T20:09:12.337Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "no constraints"
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {}
              },
              {
                "id": 101,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-03-24T20:09:12.337Z",
                "updatedAt": "2021-03-24T20:09:12.337Z",
                "children": [
                  {
                    "id": 102,
                    "document": 1,
                    "nodeType": "Regulative Statement",
                    "isNegated": false,
                    "parent": 101,
                    "createdAt": "2021-03-24T20:09:12.337Z",
                    "updatedAt": "2021-03-24T20:09:12.337Z",
                    "children": [
                      {
                        "id": 103,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [],
                        "componentType": "Attribute",
                        "text": {
                          "main": "certifiers"
                        }
                      },
                      {
                        "id": 113,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [],
                        "componentType": "Deontic",
                        "text": {
                          "main": "must"
                        }
                      },
                      {
                        "id": 105,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [],
                        "componentType": "Aim",
                        "text": {
                          "main": "revoke"
                        }
                      },
                      {
                        "id": 114,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [],
                        "componentType": "Direct Object",
                        "text": {
                          "main": "organic farming certification",
                          "prefix": "the"
                        }
                      },
                      {
                        "id": 107,
                        "document": 1,
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z"
                      },
                      {
                        "id": 108,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [
                          {
                            "id": 109,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 108,
                            "createdAt": "2021-03-24T20:09:12.337Z",
                            "updatedAt": "2021-03-24T20:09:12.337Z",
                            "children": [],
                            "componentType": "Simple Context",
                            "text": {
                              "main": "under all circumstances"
                            }
                          }
                        ],
                        "componentType": "Activation Conditions",
                        "text": {}
                      },
                      {
                        "id": 110,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z",
                        "children": [
                          {
                            "id": 111,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 110,
                            "createdAt": "2021-03-24T20:09:12.337Z",
                            "updatedAt": "2021-03-24T20:09:12.337Z",
                            "children": [],
                            "componentType": "Simple Context",
                            "text": {
                              "main": "no constraints"
                            }
                          }
                        ],
                        "componentType": "Execution Constraints",
                        "text": {}
                      },
                      {
                        "id": 112,
                        "document": 1,
                        "isNegated": false,
                        "parent": 102,
                        "createdAt": "2021-03-24T20:09:12.337Z",
                        "updatedAt": "2021-03-24T20:09:12.337Z"
                      }
                    ]
                  }
                ],
                "componentType": "Or Else",
                "text": {}
              }
            ]
          }
        },
		{
			"id": "4",
			"document": "1",
			"original": "The Ministry may issue regulations with further provisions concerning the activities of the committee, including provisions concerning procedure and concerning the duty of secrecy for members of the committee."
		}
	],
	"entryMap": {
		"1": "0",
		"2": "1",
		"3": "2",
		"4": "3"
	}
}`;

export const testDocument = Document.fromData(JSON.parse(testDocumentString) as Document);
