package com.bridgelabz.alamarocaine.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.alamarocaine.entity.Condidature;
import com.bridgelabz.alamarocaine.repository.CondidatureRepository;

@Service
public class CondiatureService {
	
	@Autowired
	private CondidatureRepository condidatureRepository;
	
	public Condidature registerCondidature(Condidature student) {
		return condidatureRepository.save(student);
	}
	
	public List<Condidature> getCondidatures(){
		return (List<Condidature>) condidatureRepository.findAll();		 
	}
	
	public void deleteCondidature(Integer id) {
		condidatureRepository.deleteById(id);
	}
	
	public Condidature updateCondidature(Condidature student) {
		Integer rollNumber = student.getRollNumber();
		Condidature std = condidatureRepository.findById(rollNumber).get();
		std.setNom(student.getNom());
		std.setPrenom(student.getPrenom());
		std.setEmail(student.getEmail());
		std.setTelephone(student.getTelephone());
		std.setPoste(student.getPoste());
		std.setCv(student.getCv());
		std.setMessage(student.getMessage());
		return condidatureRepository.save(std);
	}
	
}
