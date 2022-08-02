export type Tokadapt = {
  "version": "0.1.0",
  "name": "tokadapt",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorage",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        },
        {
          "name": "inputMint",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "input",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "inputMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorageAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "target",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAdmin",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outputStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorageAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenTarget",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "inputMint",
            "type": "publicKey"
          },
          {
            "name": "outputStorage",
            "type": "publicKey"
          },
          {
            "name": "outputStorageAuthorityBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "OutputStorageAuthorityDoesNotMatch"
          },
          {
            "name": "OutputStorageMustNotBeCloseable"
          },
          {
            "name": "OutputStorageMustNotBeDelegated"
          },
          {
            "name": "InvalidInputMint"
          },
          {
            "name": "InvalidInputAuthority"
          },
          {
            "name": "InvalidCloseTokenTarget"
          }
        ]
      }
    }
  ]
};

export const IDL: Tokadapt = {
  "version": "0.1.0",
  "name": "tokadapt",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorage",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "adminAuthority",
          "type": "publicKey"
        },
        {
          "name": "inputMint",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "input",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "inputMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorageAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "target",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAdmin",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAuthority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newAdminAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "close",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "outputStorage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "outputStorageAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenTarget",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rentCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "inputMint",
            "type": "publicKey"
          },
          {
            "name": "outputStorage",
            "type": "publicKey"
          },
          {
            "name": "outputStorageAuthorityBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ErrorCode",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "OutputStorageAuthorityDoesNotMatch"
          },
          {
            "name": "OutputStorageMustNotBeCloseable"
          },
          {
            "name": "OutputStorageMustNotBeDelegated"
          },
          {
            "name": "InvalidInputMint"
          },
          {
            "name": "InvalidInputAuthority"
          },
          {
            "name": "InvalidCloseTokenTarget"
          }
        ]
      }
    }
  ]
};
