package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.FStrategy
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FStrategyRepository : CrudRepository<FStrategy,String> {

    fun findByJforexId (jforexId : Long) : FStrategy
}