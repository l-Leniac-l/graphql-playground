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
            ]
          },
          {
            "imagePullPolicy": "IfNotPresent",
            "name": "liveness",
            "args": [
              "/graphiql"
            ],
            "image": "gcr.io/google_containers/liveness",
            "livenessProbe": {
              "httpGet": {
                "path": "/healthz",
                "port": 3000
              },
              "initialDelaySeconds": 5,
              "periodSeconds": 5
            }
          },
          {
            "imagePullPolicy": "IfNotPresent",
            "name": "readiness",
            "args": [
              "/graphiql"
            ],
            "image": "gcr.io/google_containers/readiness",
            "readinessProbe": {
              "httpGet": {
                "path": "/readiness",
                "port": 3000
              },
              "initialDelaySeconds": 5,
              "periodSeconds": 5
            }
          }
        ]
      }
    }
  }
}
EOF
