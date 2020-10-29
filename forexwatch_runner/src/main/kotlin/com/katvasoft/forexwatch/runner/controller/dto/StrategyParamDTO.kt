package com.katvasoft.forexwatch.runner.controller.dto

import com.katvasoft.forexwatch.runner.controller.domain.FStrategyParameter

data class StrategyParamDTO (

        val id : String? = null,

        val parameterName : String = "",

        val parameterValue : String = ""


) {

    object Mapper {

        fun from (fStrategyParameter: FStrategyParameter) : StrategyParamDTO {

            return StrategyParamDTO(fStrategyParameter.id,fStrategyParameter.parameterName,fStrategyParameter.parameterValue)

        }

        fun toEntity(strategyParamDTO: StrategyParamDTO, fStrategyParameter: FStrategyParameter?) : FStrategyParameter {

            return if(fStrategyParameter != null) {
                fStrategyParameter.parameterName = strategyParamDTO.parameterName
                fStrategyParameter.parameterValue = strategyParamDTO.parameterName
                fStrategyParameter
            } else {
                FStrategyParameter(strategyParamDTO.id, strategyParamDTO.parameterName, strategyParamDTO.parameterValue)
            }

        }

    }

}