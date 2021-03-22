// This is where you add sample statements when they're ready. Each statement goes in the `original` key.
// Remember to update entryMap.
// Name and description will be shown to the user.

const testDocumentString = `{
	"name": "Policy Coding Test",
	"description": "",
	"id": "1",
	"entries": [
        {
          "id": 2,
          "document": 1,
          "original": "The Program Manager may initiate suspension or revocation proceedings against a certified operation: (1) When the Program Manager has reason to believe that a certified operation has violated or is not in compliance with the Act or regulations in this part; or (2) When a certifying agent or a State organic program's governing State official fails to take appropriate action to enforce the Act or regulations in this part.",
          "root": {
            "id": 23,
            "document": 1,
            "nodeType": "Regulative Statement",
            "isNegated": false,
            "createdAt": "2021-03-22T15:50:42.667Z",
            "updatedAt": "2021-03-22T15:50:42.667Z",
            "children": [
              {
                "id": 24,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [],
                "componentType": "Attribute",
                "text": {
                  "main": "Program Manager",
                  "prefix": "The"
                }
              },
              {
                "id": 35,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [
                  {
                    "id": 36,
                    "document": 1,
                    "nodeType": "Property Junction",
                    "isNegated": false,
                    "parent": 35,
                    "createdAt": "2021-03-22T15:50:42.667Z",
                    "updatedAt": "2021-03-22T15:50:42.667Z",
                    "children": [
                      {
                        "id": 39,
                        "document": 1,
                        "nodeType": "Property",
                        "isNegated": false,
                        "parent": 36,
                        "createdAt": "2021-03-22T15:50:42.667Z",
                        "updatedAt": "2021-03-22T15:50:42.667Z",
                        "children": [],
                        "text": {
                          "main": "suspension"
                        },
                        "isFunctionallyDependent": false
                      },
                      {
                        "id": 40,
                        "document": 1,
                        "nodeType": "Property",
                        "isNegated": false,
                        "parent": 36,
                        "createdAt": "2021-03-22T15:50:42.667Z",
                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                "id": 41,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [
                  {
                    "id": 42,
                    "document": 1,
                    "nodeType": "Property",
                    "isNegated": false,
                    "parent": 41,
                    "createdAt": "2021-03-22T15:50:42.667Z",
                    "updatedAt": "2021-03-22T15:50:42.667Z",
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
                "id": 34,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [],
                "componentType": "Deontic",
                "text": {
                  "main": "may"
                }
              },
              {
                "id": 28,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [],
                "componentType": "Aim",
                "text": {
                  "main": "initiate"
                }
              },
              {
                "id": 29,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [
                  {
                    "id": 43,
                    "document": 1,
                    "nodeType": "Statement Junction",
                    "isNegated": false,
                    "parent": 29,
                    "createdAt": "2021-03-22T15:50:42.667Z",
                    "updatedAt": "2021-03-22T15:50:42.667Z",
                    "children": [
                      {
                        "id": 46,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 43,
                        "createdAt": "2021-03-22T15:50:42.667Z",
                        "updatedAt": "2021-03-22T15:50:42.667Z",
                        "children": [
                          {
                            "id": 47,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [],
                            "componentType": "Attribute",
                            "text": {
                              "main": "Program Manager",
                              "prefix": "the"
                            }
                          },
                          {
                            "id": 57,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 58,
                                "document": 1,
                                "nodeType": "Regulative Statement",
                                "isNegated": false,
                                "parent": 57,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
                                "children": [
                                  {
                                    "id": 59,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 69,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 59,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 70,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 71,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 70,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
                                        "children": [
                                          {
                                            "id": 74,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 71,
                                            "createdAt": "2021-03-22T15:50:42.667Z",
                                            "updatedAt": "2021-03-22T15:50:42.667Z",
                                            "children": [],
                                            "componentType": "Direct Object",
                                            "text": {
                                              "main": "Act",
                                              "prefix": "the"
                                            }
                                          },
                                          {
                                            "id": 75,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 71,
                                            "createdAt": "2021-03-22T15:50:42.667Z",
                                            "updatedAt": "2021-03-22T15:50:42.667Z",
                                            "children": [
                                              {
                                                "id": 76,
                                                "document": 1,
                                                "nodeType": "Property",
                                                "isNegated": false,
                                                "parent": 75,
                                                "createdAt": "2021-03-22T15:50:42.667Z",
                                                "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 61,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z"
                                  },
                                  {
                                    "id": 62,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z"
                                  },
                                  {
                                    "id": 63,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 77,
                                        "document": 1,
                                        "nodeType": "Component Junction",
                                        "isNegated": false,
                                        "parent": 63,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
                                        "children": [
                                          {
                                            "id": 80,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": false,
                                            "parent": 77,
                                            "createdAt": "2021-03-22T15:50:42.667Z",
                                            "updatedAt": "2021-03-22T15:50:42.667Z",
                                            "children": [],
                                            "componentType": "Aim",
                                            "text": {
                                              "main": "has violated"
                                            }
                                          },
                                          {
                                            "id": 81,
                                            "document": 1,
                                            "nodeType": "Component",
                                            "isNegated": true,
                                            "parent": 77,
                                            "createdAt": "2021-03-22T15:50:42.667Z",
                                            "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 64,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 65,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 64,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 66,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 67,
                                        "document": 1,
                                        "nodeType": "Component",
                                        "isNegated": false,
                                        "parent": 66,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 68,
                                    "document": 1,
                                    "isNegated": false,
                                    "parent": 58,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z"
                                  }
                                ]
                              }
                            ],
                            "componentType": "Direct Object",
                            "text": {}
                          },
                          {
                            "id": 49,
                            "document": 1,
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
                          },
                          {
                            "id": 50,
                            "document": 1,
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
                          },
                          {
                            "id": 51,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "has reason to believe",
                              "suffix": "that",
                              "rephrased": "suspects"
                            }
                          },
                          {
                            "id": 52,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 53,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 52,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 54,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 55,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 54,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 56,
                            "document": 1,
                            "isNegated": false,
                            "parent": 46,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
                          }
                        ]
                      },
                      {
                        "id": 82,
                        "document": 1,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 43,
                        "createdAt": "2021-03-22T15:50:42.667Z",
                        "updatedAt": "2021-03-22T15:50:42.667Z",
                        "children": [
                          {
                            "id": 83,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 93,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 83,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
                                "children": [
                                  {
                                    "id": 96,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 93,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 98,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 96,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                                    "id": 97,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 93,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 99,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 97,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
                                        "children": [],
                                        "text": {
                                          "main": "State organic program's"
                                        },
                                        "isFunctionallyDependent": false
                                      },
                                      {
                                        "id": 100,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 97,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 101,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 102,
                                "document": 1,
                                "nodeType": "Component Junction",
                                "isNegated": false,
                                "parent": 101,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
                                "children": [
                                  {
                                    "id": 105,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 102,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [],
                                    "componentType": "Direct Object",
                                    "text": {
                                      "main": "Act",
                                      "prefix": "the"
                                    }
                                  },
                                  {
                                    "id": 106,
                                    "document": 1,
                                    "nodeType": "Component",
                                    "isNegated": false,
                                    "parent": 102,
                                    "createdAt": "2021-03-22T15:50:42.667Z",
                                    "updatedAt": "2021-03-22T15:50:42.667Z",
                                    "children": [
                                      {
                                        "id": 107,
                                        "document": 1,
                                        "nodeType": "Property",
                                        "isNegated": false,
                                        "parent": 106,
                                        "createdAt": "2021-03-22T15:50:42.667Z",
                                        "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 85,
                            "document": 1,
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
                          },
                          {
                            "id": 86,
                            "document": 1,
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
                          },
                          {
                            "id": 87,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": true,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "fails to take appropriate action to enforce",
                              "rephrased": "fails to enforce"
                            }
                          },
                          {
                            "id": 88,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 89,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 88,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 90,
                            "document": 1,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z",
                            "children": [
                              {
                                "id": 91,
                                "document": 1,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 90,
                                "createdAt": "2021-03-22T15:50:42.667Z",
                                "updatedAt": "2021-03-22T15:50:42.667Z",
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
                            "id": 92,
                            "document": 1,
                            "isNegated": false,
                            "parent": 82,
                            "createdAt": "2021-03-22T15:50:42.667Z",
                            "updatedAt": "2021-03-22T15:50:42.667Z"
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
                "id": 31,
                "document": 1,
                "nodeType": "Component",
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z",
                "children": [
                  {
                    "id": 32,
                    "document": 1,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 31,
                    "createdAt": "2021-03-22T15:50:42.667Z",
                    "updatedAt": "2021-03-22T15:50:42.667Z",
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
                "id": 33,
                "document": 1,
                "isNegated": false,
                "parent": 23,
                "createdAt": "2021-03-22T15:50:42.667Z",
                "updatedAt": "2021-03-22T15:50:42.667Z"
              }
            ]
          }
        },
        
        
        
        
        
        
        
        
        

		{
			"id": "3",
			"document": "1",
			"original": "From 1st of January onward, food preparation guidelines must adhere to national standards, in addition to communal provisions.",
			"root": {
                "id": 2,
                "document": 2,
                "nodeType": "Constitutive Statement",
                "isNegated": false,
                "createdAt": "2021-03-22T16:15:35.464Z",
                "updatedAt": "2021-03-22T16:15:35.464Z",
                "children": [
                  {
                    "id": 13,
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [],
                    "componentType": "Constituting Properties",
                    "text": {
                      "main": "national standards"
                    }
                  },
                  {
                    "id": 12,
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [],
                    "componentType": "Modal",
                    "text": {
                      "main": "must"
                    }
                  },
                  {
                    "id": 5,
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [],
                    "componentType": "Constitutive Function",
                    "text": {
                      "main": "adhere",
                      "suffix": "to"
                    }
                  },
                  {
                    "id": 6,
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [],
                    "componentType": "Constituted Entity",
                    "text": {
                      "main": "food preparation guidelines"
                    }
                  },
                  {
                    "id": 7,
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [
                      {
                        "id": 14,
                        "document": 2,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 7,
                        "createdAt": "2021-03-22T16:15:35.464Z",
                        "updatedAt": "2021-03-22T16:15:35.464Z",
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
                    "document": 2,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z",
                    "children": [
                      {
                        "id": 15,
                        "document": 2,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 9,
                        "createdAt": "2021-03-22T16:15:35.464Z",
                        "updatedAt": "2021-03-22T16:15:35.464Z",
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
                    "document": 2,
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:15:35.464Z",
                    "updatedAt": "2021-03-22T16:15:35.464Z"
                  }
                ]
            }
		},
		
		
		
		
		
		
		
		{
			"id": "4",
			"document": "1",
			"original": "Organic farmers must comply with organic farming regulations, or else certifiers must revoke the organic farming certification.",
			"root": {
                "id": 2,
                "document": 3,
                "nodeType": "Regulative Statement",
                "isNegated": false,
                "createdAt": "2021-03-22T16:20:15.273Z",
                "updatedAt": "2021-03-22T16:20:15.273Z",
                "children": [
                  {
                    "id": 3,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [],
                    "componentType": "Attribute",
                    "text": {
                      "main": "Organic farmers"
                    }
                  },
                  {
                    "id": 14,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [],
                    "componentType": "Direct Object",
                    "text": {
                      "main": "organic farming regulations"
                    }
                  },
                  {
                    "id": 5,
                    "document": 3,
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z"
                  },
                  {
                    "id": 13,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [],
                    "componentType": "Deontic",
                    "text": {
                      "main": "must"
                    }
                  },
                  {
                    "id": 7,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [],
                    "componentType": "Aim",
                    "text": {
                      "main": "comply",
                      "suffix": "with"
                    }
                  },
                  {
                    "id": 8,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [
                      {
                        "id": 9,
                        "document": 3,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 8,
                        "createdAt": "2021-03-22T16:20:15.273Z",
                        "updatedAt": "2021-03-22T16:20:15.273Z",
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
                    "id": 10,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [
                      {
                        "id": 11,
                        "document": 3,
                        "nodeType": "Component",
                        "isNegated": false,
                        "parent": 10,
                        "createdAt": "2021-03-22T16:20:15.273Z",
                        "updatedAt": "2021-03-22T16:20:15.273Z",
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
                    "id": 15,
                    "document": 3,
                    "nodeType": "Component",
                    "isNegated": false,
                    "parent": 2,
                    "createdAt": "2021-03-22T16:20:15.273Z",
                    "updatedAt": "2021-03-22T16:20:15.273Z",
                    "children": [
                      {
                        "id": 16,
                        "document": 3,
                        "nodeType": "Regulative Statement",
                        "isNegated": false,
                        "parent": 15,
                        "createdAt": "2021-03-22T16:20:15.273Z",
                        "updatedAt": "2021-03-22T16:20:15.273Z",
                        "children": [
                          {
                            "id": 17,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [],
                            "componentType": "Attribute",
                            "text": {
                              "main": "certifiers"
                            }
                          },
                          {
                            "id": 28,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [],
                            "componentType": "Direct Object",
                            "text": {
                              "main": "organic farming certification",
                              "prefix": "the"
                            }
                          },
                          {
                            "id": 19,
                            "document": 3,
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z"
                          },
                          {
                            "id": 27,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [],
                            "componentType": "Deontic",
                            "text": {
                              "main": "must"
                            }
                          },
                          {
                            "id": 21,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [],
                            "componentType": "Aim",
                            "text": {
                              "main": "revoke"
                            }
                          },
                          {
                            "id": 22,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [
                              {
                                "id": 23,
                                "document": 3,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 22,
                                "createdAt": "2021-03-22T16:20:15.273Z",
                                "updatedAt": "2021-03-22T16:20:15.273Z",
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
                            "id": 24,
                            "document": 3,
                            "nodeType": "Component",
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z",
                            "children": [
                              {
                                "id": 25,
                                "document": 3,
                                "nodeType": "Component",
                                "isNegated": false,
                                "parent": 24,
                                "createdAt": "2021-03-22T16:20:15.273Z",
                                "updatedAt": "2021-03-22T16:20:15.273Z",
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
                            "id": 26,
                            "document": 3,
                            "isNegated": false,
                            "parent": 16,
                            "createdAt": "2021-03-22T16:20:15.273Z",
                            "updatedAt": "2021-03-22T16:20:15.273Z"
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
			"id": "5",
			"document": "1",
			"original": "The Ministry may issue regulations with further provisions concerning the activities of the committee, including provisions concerning procedure and concerning the duty of secrecy for members of the committee."
		}
	],
	"entryMap": {
		"2": "0",
		"3": "1",
		"4": "2",
		"5": "3"
	}
}`;

export default testDocumentString;