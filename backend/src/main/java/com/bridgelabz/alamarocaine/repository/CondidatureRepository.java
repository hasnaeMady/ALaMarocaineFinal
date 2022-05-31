package com.bridgelabz.alamarocaine.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bridgelabz.alamarocaine.entity.Condidature;
@Repository
public interface CondidatureRepository extends CrudRepository<Condidature, Integer> {

}
