package com.katvasoft.forexwatch.runner.controller.helper

class Constants {

    companion object {

            val JWT_SECRET = "Th1s1sV3rySecretSh1t"

            val JWT_EXPIRATION_TIME = 864000000

            val JWT_TOKEN_PREFIX = "Bearer "

            val JWT_HEADER_STRING = "Authorization"

            val PROP_STRATEGY_DEPLOYMENT_DIR = "strategy.deployment.dir"

            val PROP_STRATEGY_DEPLOYMENT_SUFFIX = "strategy.deployment.suffix"

            val PROP_STRATEGY_COMPILED_SUFFIX = "strategy.deployed.suffix"

            val PROP_STRATEGY_JAR_DEPLOYMENT_SUFFIX = "strategy.jar.deployment.suffix"

            val PROP_SETTING_CLIENT_ID = "client.id";

            val PROP_SEND_GRID_API_KEY = "send.grid.api.key"

            val PROP_SEND_GRID_FROM = "send.grid.from"

            val PROP_SETTING_EMAIL_RECEIVER = "email.receiver"

            val PROP_EMAIL_CONTENT_TYPE = "text/plain"

    }


}