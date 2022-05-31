
// tous les commenataires sont les miens
package com.bridgelabz.alamarocaine.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bridgelabz.alamarocaine.entity.Chef;

@Repository
public interface ChefImple extends JpaRepository<Chef, Long> {

	@Query("from Chef where chef_id=:id")
	Chef fetchbyId(Long id);

	@Query(value = "select * from Chef", nativeQuery = true)
	List<Chef> findAllPage(Pageable pageable);

	@Query("from Chef where chef_id=:id ")
	List<Chef> fetchbyIdList(Long id);

	@Modifying
	@Query("delete from Chef where chef_id=:id")
	void deleteByChefId(long id);

	

	

	@Query(value = "select * from Chef where user_id=:id", nativeQuery = true)
	List<Chef> getAllChefs(long id);

	
	@Query("from Chef where chef_name=:name")
	Chef fetchbyChefName(String name);
}