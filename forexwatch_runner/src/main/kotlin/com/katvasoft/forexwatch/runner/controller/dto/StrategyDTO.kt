package com.katvasoft.forexwatch.runner.controller.dto

import com.katvasoft.forexwatch.runner.controller.domain.FStrategy
import java.util.*

data class StrategyDTO (

        val id : String? = null,

        val strategyName : String = "",

        val completeClassname : String = "",

        val clazzClassLocation : String  = "",

        val running : Boolean = false,

        val modifyDate : Long = 0,

        val parameters : List<StrategyParamDTO>? = null
) {

    object Mapper {

        fun from(fStrategy: FStrategy) = StrategyDTO(fStrategy.id,fStrategy.strategyName,fStrategy.completeClassname,fStrategy.clazzClassLocation,fStrategy.running, 0,
                fStrategy.parameters?.map { fStrategyParameter -> StrategyParamDTO.Mapper.from(fStrategyParameter) })

        fun toEntity(strategyDTO: StrategyDTO, fStrategy: FStrategy?) : FStrategy {

           return if (fStrategy != null) {

               fStrategy.completeClassname = strategyDTO.completeClassname
               fStrategy.clazzClassLocation = strategyDTO.clazzClassLocation
               fStrategy.running = strategyDTO.running
               fStrategy.strategyName = strategyDTO.strategyName
               fStrategy.parameters = strategyDTO.parameters?.map { param -> StrategyParamDTO.Mapper.toEntity(param,null) }?.toMutableList()

               fStrategy

           } else {
               FStrategy(strategyDTO.id, strategyDTO.strategyName, null, strategyDTO.completeClassname, strategyDTO.clazzClassLocation,
                       strategyDTO.parameters?.map { param -> StrategyParamDTO.Mapper.toEntity(param,null) }?.toMutableList())
           }

        }

    }

}