package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.FStrategyParameter
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FStrategyParameterRepository : CrudRepository<FStrategyParameter,String> {
}