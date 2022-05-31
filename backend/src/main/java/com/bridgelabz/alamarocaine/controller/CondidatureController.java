package com.bridgelabz.alamarocaine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.alamarocaine.entity.Condidature;
import com.bridgelabz.alamarocaine.service.CondiatureService;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class CondidatureController {

	@Autowired
	private CondiatureService condidatureService;

	@PostMapping("/registerCondidature")
	public Condidature registerStudent(@RequestBody Condidature student) {
		return condidatureService.registerCondidature(student);
	}
	
	@GetMapping("/getCondidatures")
	public List<Condidature> getCondidatures(){
		return condidatureService.getCondidatures();		
	}
	
	@DeleteMapping("/deleteCondidature")
	public void deleteStudent(@RequestParam Integer id) {
		condidatureService.deleteCondidature(id);
	}
	
	/*@PutMapping("/updateStudents")
	public Student updateStudent(@RequestBody Student student) {
		return  studentService.updateStudent(student);
	}*/
}
