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
          "root": {
            "id": 2,
            "document": 1,
            "nodeType": "Regulative Statement",
            "isNegated": false,
            "contextType": 0,
            "createdAt": "2021-04-08T10:03:53.693Z",
            "updatedAt": "2021-04-08T10:03:53.693Z",
            "children": [
              {
                "id": 3,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z",
                "children": [],
                "componentType": "Attribute",
                "text": {
                  "main": "Program Manager",
                  "prefix": "The",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 13,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z",
                "children": [],
                "componentType": "Deontic",
                "text": {
                  "main": "may",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 5,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z",
                "children": [],
                "componentType": "Aim",
                "text": {
                  "main": "initiate",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 14,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z",
                "children": [
                  {
                    "id": 15,
                    "document": 1,
                    "nodeType": "Property Junction",
                    "isNegated": false,
                    "parent": 14,
                    "createdAt": "2021-04-08T10:03:53.693Z",
                    "updatedAt": "2021-04-08T10:03:53.693Z",
                    "children": [
                      {
                        "id": 18,
                        "document": 1,
                        "isNegated": false,
                        "parent": 15,
                        "createdAt": "2021-04-08T10:03:53.693Z",
                        "updatedAt": "2021-04-08T10:03:53.693Z",
                        "children": []
                      },
                      {
                        "id": 19,
                        "document": 1,
                        "nodeType": "Property",
                        "isNegated": false,
                        "parent": 15,
                        "createdAt": "2021-04-08T10:03:53.693Z",
                        "updatedAt": "2021-04-08T10:03:53.693Z",
                        "children": [],
                        "text": {
                          "main": "revocation",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        },
                        "isFunctionallyDependent": false
                      }
                    ],
                    "junctionType": "XOR",
                    "text": {
                      "main": "or",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    },
                    "isFunctionallyDependent": false
                  }
                ],
                "componentType": "Direct Object",
                "text": {
                  "main": "proceedings",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 20,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.694Z",
                "children": [
                  {
                    "id": 21,
                    "document": 1,
                    "nodeType": "Property",
                    "isNegated": false,
                    "parent": 20,
                    "createdAt": "2021-04-08T10:03:53.694Z",
                    "updatedAt": "2021-04-08T10:03:53.694Z",
                    "children": [],
                    "text": {
                      "main": "certified",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    },
                    "isFunctionallyDependent": false
                  }
                ],
                "componentType": "Indirect Object",
                "text": {
                  "main": "operation",
                  "prefix": "against a",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 8,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.694Z",
                "children": [
                  {
                    "id": 22,
                    "document": 1,
                    "nodeType": "Statement Junction",
                    "isNegated": false,
                    "parent": 8,
                    "createdAt": "2021-04-08T10:03:53.694Z",
                    "updatedAt": "2021-04-08T10:03:53.694Z",
                    "children": [
                      {
                        "id": 25,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 22,
                        "createdAt": "2021-04-08T10:03:53.694Z",
                        "updatedAt": "2021-04-08T10:03:53.694Z",
                        "children": [
                          {
                            "id": 26,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [],
                            "componentType": "Attribute",
                            "text": {
                              "main": "Program Manager",
                              "prefix": "the",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 27,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          },
                          {
                            "id": 28,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "has reason to believe",
                              "prefix": "",
                              "suffix": "that",
                              "inferredOrRephrased": "suspects"
                            }
                          },
                          {
                            "id": 36,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 37,
                                "document": 1,
                                "nodeType": "Regulative Statement",
                                "isNegated": false,
                                "parent": 36,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [
                                  {
                                    "id": 38,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 48,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 38,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "text": {
                                          "main": "certified",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "operation",
                                      "prefix": "a",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 39,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z"
                                  },
                                  {
                                    "id": 40,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 56,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 40,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [
                                          {
                                            "id": 59,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 56,
                                            "createdAt": "2021-04-08T10:03:53.694Z",
                                            "updatedAt": "2021-04-08T10:03:53.694Z",
                                            "children": [],
                                            "componentType": "Aim",
                                            "text": {
                                              "main": "has violated",
                                              "prefix": "",
                                              "suffix": "",
                                              "inferredOrRephrased": ""
                                            }
                                          },
                                          {
                                            "id": 60,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": true,
                                            "parent": 56,
                                            "createdAt": "2021-04-08T10:03:53.694Z",
                                            "updatedAt": "2021-04-08T10:03:53.694Z",
                                            "children": [],
                                            "componentType": "Aim",
                                            "text": {
                                              "main": "is not in compliance",
                                              "prefix": "",
                                              "suffix": "",
                                              "inferredOrRephrased": ""
                                            }
                                          }
                                        ],
                                        "junctionType": "OR",
                                        "text": {
                                          "main": "or",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "componentType": "Aim"
                                      }
                                    ],
                                    "componentType": "Aim",
                                    "text": {
                                      "main": "",
                                      "prefix": "",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 49,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 50,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 49,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [
                                          {
                                            "id": 53,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 50,
                                            "createdAt": "2021-04-08T10:03:53.694Z",
                                            "updatedAt": "2021-04-08T10:03:53.694Z",
                                            "children": [],
                                            "componentType": "Direct Object",
                                            "text": {
                                              "main": "Act",
                                              "prefix": "the",
                                              "suffix": "",
                                              "inferredOrRephrased": ""
                                            }
                                          },
                                          {
                                            "id": 54,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 50,
                                            "createdAt": "2021-04-08T10:03:53.694Z",
                                            "updatedAt": "2021-04-08T10:03:53.694Z",
                                            "children": [
                                              {
                                                "id": 55,
                                                "document": 1,
                                                "nodeType": "Property",
                                                "isNegated": false,
                                                "parent": 54,
                                                "createdAt": "2021-04-08T10:03:53.694Z",
                                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                                "children": [],
                                                "text": {
                                                  "main": "in this part",
                                                  "prefix": "",
                                                  "suffix": "",
                                                  "inferredOrRephrased": ""
                                                },
                                                "isFunctionallyDependent": false
                                              }
                                            ],
                                            "componentType": "Direct Object",
                                            "text": {
                                              "main": "regulations",
                                              "prefix": "",
                                              "suffix": "",
                                              "inferredOrRephrased": ""
                                            }
                                          }
                                        ],
                                        "junctionType": "OR",
                                        "text": {
                                          "main": "or",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "componentType": "Direct Object"
                                      }
                                    ],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "",
                                      "prefix": "",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 42,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z"
                                  },
                                  {
                                    "id": 43,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 44,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 43,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "componentType": "Simple Context",
                                        "text": {
                                          "main": "under all circumstances",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        }
                                      }
                                    ],
                                    "componentType": "Activation Conditions",
                                    "text": {
                                      "main": "",
                                      "prefix": "",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 45,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 46,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 45,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "componentType": "Simple Context",
                                        "text": {
                                          "main": "no constraints",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        }
                                      }
                                    ],
                                    "componentType": "Execution Constraints",
                                    "text": {
                                      "main": "",
                                      "prefix": "",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 47,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 37,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z"
                                  }
                                ]
                              }
                            ],
                            "componentType": "Direct Object",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 30,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          },
                          {
                            "id": 31,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 32,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 31,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "under all circumstances",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                }
                              }
                            ],
                            "componentType": "Activation Conditions",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 33,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 34,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 33,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "no constraints",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                }
                              }
                            ],
                            "componentType": "Execution Constraints",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 35,
                            "document": 1,
                            "isNegated": false,
                            "parent": 25,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          }
                        ]
                      },
                      {
                        "id": 61,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 22,
                        "createdAt": "2021-04-08T10:03:53.694Z",
                        "updatedAt": "2021-04-08T10:03:53.694Z",
                        "children": [
                          {
                            "id": 62,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 72,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 62,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [
                                  {
                                    "id": 75,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 72,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 77,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 75,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "text": {
                                          "main": "certifying",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "agent",
                                      "prefix": "a",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 76,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 72,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 78,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 76,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "text": {
                                          "main": "State organic program's",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "isFunctionallyDependent": false
                                      },
                                      {
                                        "id": 79,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 76,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "text": {
                                          "main": "governing",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Attribute",
                                    "text": {
                                      "main": "State official",
                                      "prefix": "a",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  }
                                ],
                                "junctionType": "OR",
                                "text": {
                                  "main": "or",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                },
                                "componentType": "Attribute"
                              }
                            ],
                            "componentType": "Attribute",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 63,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          },
                          {
                            "id": 64,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": true,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "fails to take appropriate action to enforce",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": "fails to enforce"
                            }
                          },
                          {
                            "id": 80,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 81,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 80,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [
                                  {
                                    "id": 84,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 81,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "Act",
                                      "prefix": "the",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  },
                                  {
                                    "id": 85,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 81,
                                    "createdAt": "2021-04-08T10:03:53.694Z",
                                    "updatedAt": "2021-04-08T10:03:53.694Z",
                                    "children": [
                                      {
                                        "id": 86,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 85,
                                        "createdAt": "2021-04-08T10:03:53.694Z",
                                        "updatedAt": "2021-04-08T10:03:53.694Z",
                                        "children": [],
                                        "text": {
                                          "main": "in this part",
                                          "prefix": "",
                                          "suffix": "",
                                          "inferredOrRephrased": ""
                                        },
                                        "isFunctionallyDependent": false
                                      }
                                    ],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "regulations",
                                      "prefix": "",
                                      "suffix": "",
                                      "inferredOrRephrased": ""
                                    }
                                  }
                                ],
                                "junctionType": "OR",
                                "text": {
                                  "main": "or",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                },
                                "componentType": "Direct Object"
                              }
                            ],
                            "componentType": "Direct Object",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 66,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          },
                          {
                            "id": 67,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 68,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 67,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "under all circumstances",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                }
                              }
                            ],
                            "componentType": "Activation Conditions",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 69,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z",
                            "children": [
                              {
                                "id": 70,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 69,
                                "createdAt": "2021-04-08T10:03:53.694Z",
                                "updatedAt": "2021-04-08T10:03:53.694Z",
                                "children": [],
                                "componentType": "Simple Context",
                                "text": {
                                  "main": "no constraints",
                                  "prefix": "",
                                  "suffix": "",
                                  "inferredOrRephrased": ""
                                }
                              }
                            ],
                            "componentType": "Execution Constraints",
                            "text": {
                              "main": "",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          },
                          {
                            "id": 71,
                            "document": 1,
                            "isNegated": false,
                            "parent": 61,
                            "createdAt": "2021-04-08T10:03:53.694Z",
                            "updatedAt": "2021-04-08T10:03:53.694Z"
                          }
                        ]
                      }
                    ],
                    "junctionType": "OR",
                    "text": {
                      "main": "or",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 10,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z",
                "children": [
                  {
                    "id": 11,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 10,
                    "createdAt": "2021-04-08T10:03:53.693Z",
                    "updatedAt": "2021-04-08T10:03:53.693Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "no constraints",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 12,
                "document": 1,
                "isNegated": false,
                "parent": 2,
                "createdAt": "2021-04-08T10:03:53.693Z",
                "updatedAt": "2021-04-08T10:03:53.693Z"
              }
            ]
          },
          "original": "The Program Manager may initiate suspension or revocation proceedings against a certified operation: (1) When the Program Manager has reason to believe that a certified operation has violated or is not in compliance with the Act or regulations in this part; or (2) When a certifying agent or a State organic program's governing State official fails to take appropriate action to enforce the Act or regulations in this part.",
          "rephrased": "This is a rephrased version of Program Manager policy."
        },
        {
          "id": 87,
          "document": 1,
          "root": {
            "id": 88,
            "document": 1,
            "nodeType": "Constitutive Statement",
            "isNegated": false,
            "createdAt": "2021-04-08T10:03:53.694Z",
            "updatedAt": "2021-04-08T10:03:53.695Z",
            "children": [
              {
                "id": 89,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.694Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Constituted Entity",
                "text": {
                  "main": "food preparation guidelines",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 98,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Modal",
                "text": {
                  "main": "must",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 91,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.694Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Constitutive Function",
                "text": {
                  "main": "adhere",
                  "prefix": "",
                  "suffix": "to",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 99,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Constituting Properties",
                "text": {
                  "main": "national standards",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 93,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.694Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [
                  {
                    "id": 100,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 93,
                    "createdAt": "2021-04-08T10:03:53.695Z",
                    "updatedAt": "2021-04-08T10:03:53.695Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "From 1st of January onward",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 95,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.694Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [
                  {
                    "id": 101,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 95,
                    "createdAt": "2021-04-08T10:03:53.695Z",
                    "updatedAt": "2021-04-08T10:03:53.695Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "communal provisions",
                      "prefix": "in addition to",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 97,
                "document": 1,
                "isNegated": false,
                "parent": 88,
                "createdAt": "2021-04-08T10:03:53.694Z",
                "updatedAt": "2021-04-08T10:03:53.694Z"
              }
            ]
          },
          "original": "From 1st of January onward, food preparation guidelines must adhere to national standards, in addition to communal provisions.",
          "rephrased": ""
        },
        {
          "id": 102,
          "document": 1,
          "root": {
            "id": 103,
            "document": 1,
            "nodeType": "Regulative Statement",
            "isNegated": false,
            "createdAt": "2021-04-08T10:03:53.695Z",
            "updatedAt": "2021-04-08T10:03:53.695Z",
            "children": [
              {
                "id": 104,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Attribute",
                "text": {
                  "main": "Organic farmers",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 114,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Deontic",
                "text": {
                  "main": "must",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 106,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Aim",
                "text": {
                  "main": "comply",
                  "prefix": "",
                  "suffix": "with",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 115,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [],
                "componentType": "Direct Object",
                "text": {
                  "main": "organic farming regulations",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 108,
                "document": 1,
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z"
              },
              {
                "id": 109,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [
                  {
                    "id": 110,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 109,
                    "createdAt": "2021-04-08T10:03:53.695Z",
                    "updatedAt": "2021-04-08T10:03:53.695Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "under all circumstances",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Activation Conditions",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 111,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [
                  {
                    "id": 112,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 111,
                    "createdAt": "2021-04-08T10:03:53.695Z",
                    "updatedAt": "2021-04-08T10:03:53.695Z",
                    "children": [],
                    "componentType": "Simple Context",
                    "text": {
                      "main": "no constraints",
                      "prefix": "",
                      "suffix": "",
                      "inferredOrRephrased": ""
                    }
                  }
                ],
                "componentType": "Execution Constraints",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              },
              {
                "id": 116,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 103,
                "createdAt": "2021-04-08T10:03:53.695Z",
                "updatedAt": "2021-04-08T10:03:53.695Z",
                "children": [
                  {
                    "id": 117,
                    "document": 1,
                    "nodeType": "Regulative Statement",
                    "isNegated": false,
                    "parent": 116,
                    "createdAt": "2021-04-08T10:03:53.695Z",
                    "updatedAt": "2021-04-08T10:03:53.695Z",
                    "children": [
                      {
                        "id": 118,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [],
                        "componentType": "Attribute",
                        "text": {
                          "main": "certifiers",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 128,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [],
                        "componentType": "Deontic",
                        "text": {
                          "main": "must",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 120,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [],
                        "componentType": "Aim",
                        "text": {
                          "main": "revoke",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 129,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [],
                        "componentType": "Direct Object",
                        "text": {
                          "main": "organic farming certification",
                          "prefix": "the",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 122,
                        "document": 1,
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z"
                      },
                      {
                        "id": 123,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [
                          {
                            "id": 124,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 123,
                            "createdAt": "2021-04-08T10:03:53.695Z",
                            "updatedAt": "2021-04-08T10:03:53.695Z",
                            "children": [],
                            "componentType": "Simple Context",
                            "text": {
                              "main": "under all circumstances",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          }
                        ],
                        "componentType": "Activation Conditions",
                        "text": {
                          "main": "",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 125,
                        "document": 1,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z",
                        "children": [
                          {
                            "id": 126,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 125,
                            "createdAt": "2021-04-08T10:03:53.695Z",
                            "updatedAt": "2021-04-08T10:03:53.695Z",
                            "children": [],
                            "componentType": "Simple Context",
                            "text": {
                              "main": "no constraints",
                              "prefix": "",
                              "suffix": "",
                              "inferredOrRephrased": ""
                            }
                          }
                        ],
                        "componentType": "Execution Constraints",
                        "text": {
                          "main": "",
                          "prefix": "",
                          "suffix": "",
                          "inferredOrRephrased": ""
                        }
                      },
                      {
                        "id": 127,
                        "document": 1,
                        "isNegated": false,
                        "parent": 117,
                        "createdAt": "2021-04-08T10:03:53.695Z",
                        "updatedAt": "2021-04-08T10:03:53.695Z"
                      }
                    ]
                  }
                ],
                "componentType": "Or Else",
                "text": {
                  "main": "",
                  "prefix": "",
                  "suffix": "",
                  "inferredOrRephrased": ""
                }
              }
            ]
          },
          "original": "Organic farmers must comply with organic farming regulations, or else certifiers must revoke the organic farming certification.",
          "rephrased": ""
        },
        {
          "id": 130,
          "document": 1,
          "original": "The Ministry may issue regulations with further provisions concerning the activities of the committee, including provisions concerning procedure and concerning the duty of secrecy for members of the committee.",
          "rephrased": ""
        }
      ],
      "entryMap": {
        "1": 0,
        "87": 1,
        "102": 2,
        "130": 3
      }
    }
`;

export const testDocumentDev = Document.fromData(JSON.parse(testDocumentString) as Document);
