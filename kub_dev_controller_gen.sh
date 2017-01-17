#!/bin/bash

cat > kub_dev_controller.json <<EOF
{
  "kind": "ReplicationController",
  "apiVersion": "v1",
  "metadata": {
    "name": "graphql",
    "labels": {
      "name": "graphql"
    }
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "name": "graphql"
    },
    "template": {
      "metadata": {
        "labels": {
          "name": "graphql",
          "deployment": "${WERCKER_GIT_COMMIT}"
        }
      },
      "spec": {
        "containers": [
          {
            "imagePullPolicy": "Always",
            "image": "quay.io/lnlwd/graphql-playground:${WERCKER_GIT_COMMIT}",
            "name": "graphql",
            "ports": [
              {
                "name": "http-server",
                "containerPort": 3000,
                "protocol": "TCP"
              }
            ],
            "livenessProbe": {
              "httpGet": {
                "path": "/graphiql",
                "port": 3000
              },
              "initialDelaySeconds": 3,
              "periodSeconds": 3
            },
            "readinessProbe": {
              "httpGet": {
                "path": "/graphiql",
                "port": 3000
              },
              "initialDelaySeconds": 3,
              "periodSeconds": 3
            }
          }
        ]
      }
    }
  }
}
EOF
