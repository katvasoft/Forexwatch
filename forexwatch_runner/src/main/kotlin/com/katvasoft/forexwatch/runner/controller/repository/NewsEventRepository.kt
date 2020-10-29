package com.katvasoft.forexwatch.runner.controller.repository

import com.katvasoft.forexwatch.runner.controller.domain.NewsEvent
import org.springframework.data.repository.CrudRepository

interface NewsEventRepository : CrudRepository<NewsEvent,String> {

}