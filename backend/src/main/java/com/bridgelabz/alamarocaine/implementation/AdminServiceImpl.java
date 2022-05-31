package com.bridgelabz.alamarocaine.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.alamarocaine.entity.Plat;
import com.bridgelabz.alamarocaine.entity.Users;
import com.bridgelabz.alamarocaine.exception.AdminNotFoundException;
import com.bridgelabz.alamarocaine.exception.PlatNotFoundException;
import com.bridgelabz.alamarocaine.repository.ChefImple;
import com.bridgelabz.alamarocaine.repository.ChefInterface;
import com.bridgelabz.alamarocaine.repository.CustomerRepository;
import com.bridgelabz.alamarocaine.repository.PlatImple;
import com.bridgelabz.alamarocaine.repository.PlatInterface;
import com.bridgelabz.alamarocaine.service.IAdminService;
import com.bridgelabz.alamarocaine.util.JwtGenerator;

@Service
public class AdminServiceImpl implements IAdminService {


	@Autowired
	CustomerRepository userRepo;

	@Autowired
	JwtGenerator jwt;

	@Autowired
	private PlatImple platRepository;

	@Autowired
	private ChefImple chefRepository;

	@Autowired
	PlatInterface platRepo;

	@Autowired
	ChefInterface chefRepo;

	// A SUPPRIMER
	@Override
	public boolean verifyPlat(long platId, String staus, String token) {

		long userid = 0;
		Users user = null;
		userid = jwt.parseJWT(token);
		System.out.println("user id:" + userid);
		user = userRepo.getCustomerDetailsbyId(userid);
		System.out.println("user:" + user);

		if (user != null) {
			Plat plat = platRepo.findByPlatId(platId);
			System.out.println("platinfo " + plat);

			if (plat != null) {
				plat.setStatus(staus);

				platRepo.save(plat);
				return true;

			} else {
				throw new PlatNotFoundException("Plat non retrouvé");
			}

		} else {
			throw new AdminNotFoundException("Admin Not Found");
		}
	}

	// A SUPPRIMER
	@Override
	public List<Plat> getPlatsByStatus(String status) {

		return platRepo.findByStatus(status);
	}

	

}
