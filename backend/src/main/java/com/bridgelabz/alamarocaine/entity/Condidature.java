package com.bridgelabz.alamarocaine.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Condidature {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer rollNumber;
	private String nom;
	private String prenom;
	private String email;
	private String telephone;
	private String poste;
	private String cv;
	private String message;
	public Integer getRollNumber() {
		return rollNumber;
	}
	public void setRollNumber(Integer rollNumber) {
		this.rollNumber = rollNumber;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getPoste() {
		return poste;
	}
	public void setPoste(String poste) {
		this.poste = poste;
	}
	public String getCv() {
		return cv;
	}
	public void setCv(String cv) {
		this.cv = cv;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
	
}
