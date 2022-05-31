package com.bridgelabz.alamarocaine.implementation;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.alamarocaine.dto.ChefDto;
import com.bridgelabz.alamarocaine.dto.EditChefDto;
import com.bridgelabz.alamarocaine.entity.Chef;
import com.bridgelabz.alamarocaine.entity.Users;
import com.bridgelabz.alamarocaine.exception.ChefAlreadyExist;//////////////
import com.bridgelabz.alamarocaine.exception.UserException;
import com.bridgelabz.alamarocaine.repository.ChefImple;
// h import com.bridgelabz.alamarocaine.repository.AddressRepository;
import com.bridgelabz.alamarocaine.repository.IUserRepository;
//h  import com.bridgelabz.alamarocaine.repository.ReviewRatingRepository;
import com.bridgelabz.alamarocaine.response.EmailData;
import com.bridgelabz.alamarocaine.service.IChefService;
import com.bridgelabz.alamarocaine.util.EmailProviderService;
import com.bridgelabz.alamarocaine.util.JwtGenerator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ChefServiceImplementation implements IChefService {
	private Chef chefinformation = new Chef();
	private ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private EmailProviderService em;
	@Autowired
	private EmailData emailData;

	@Autowired
	private ChefImple repository;

	@Autowired
	private IUserRepository userRepository;

	// h @Autowired
	// h AddressRepository addrepository;

	@Autowired
	private JwtGenerator generate;

	// @Autowired
	// h private ReviewRatingRepository rrRepository;

	// @Autowired
	// h private WishlistImplementation WishServiceNotify;

	@Transactional
	@Override

	public boolean addChefs(String imageName, ChefDto information, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;
			if (fetchRole.equals("seller")) {
				Chef chef = repository.fetchbyChefName(information.getChefName());
				System.out.println("Chef name " + information.getChefName());
				if (chef == null) {
					chefinformation = modelMapper.map(information, Chef.class);
					chefinformation.setChefName(information.getChefName());////////
					chefinformation.setChefPrenom(information.getChefPrenom());//////
					chefinformation.setOrigine(information.getOrigine());
					chefinformation.setChefDeSemaine(information.isChefDeSemaine());
					chefinformation.setImage(imageName);

					chefinformation.setCreatedDateAndTime(LocalDateTime.now());
					chefinformation.setUserId(id);
					repository.save(chefinformation);
					return true;
				} else {
					throw new ChefAlreadyExist("Chef is already exist Exception..");
				}
			} else {
				throw new UserException("Your are not Authorized User");
			}

		} else {
			throw new UserException("Utilisateur existe déjà");
		}

	}

	@Transactional
	@Override
	public List<Chef> getChefInfo(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Chef> chefs = repository.getAllChefs(id);/////
			return chefs;
		} else {
			throw new UserException("User doesn't exist");
		}

	}

	public double getOriginalPrice(double price, long quantity) {
		long result = (long) (price / quantity);
		return result;
	}

	

	@Transactional
	@Override
	public List<Chef> sortGetAllChefs() {
		List<Chef> list = repository.findAll();
		list.sort((Chef chef1, Chef chef2) -> chef1.getCreatedDateAndTime().compareTo(chef2.getCreatedDateAndTime()));
		return list;
	}

	

	@Override
	public Chef getChefbyId(Long chefId) {
		Chef info = repository.fetchbyId(chefId);
		if (info != null) {
			return info;
		}
		return null;
	}

	@Override

	public boolean editChef(long chefId, EditChefDto information, String token) {

		Long id;
		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Chef info = repository.fetchbyId(chefId);
				if (info != null) {
					// h Long l = info.getNoOfPlats();
					// h int beforeNoOfplats = l.intValue();
					// log.info("------------------------"+beforeNoOfbooks);
					info.setChefId(chefId);
					info.setChefName(information.getChefName());
					// h info.setNoOfPlats(information.getNoOfPlats());
					info.setOrigine(information.getOrigine());
					info.setChefPrenom(information.getChefPrenom());
					info.setSpecialite(information.getSpecialite());
					info.setChefDeSemaine(information.isChefDeSemaine());
//						info.setImage(imageName);
					info.setUpdatedDateAndTime(information.getUpdatedAt());

					info.setUpdatedDateAndTime(LocalDateTime.now());
					repository.save(info);
					return true;
				}
			} else {
				throw new UserException("Your are not Authorized User");
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}

	@Transactional
	@Override
	public boolean deleteChef(long chefId, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			// log.info("Actual ");
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Chef info = repository.fetchbyId(chefId);
				if (info != null) {
					repository.deleteByChefId(chefId);
					return true;
				}
			} else {
				throw new UserException("Your are not Authorized User");
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}

	

	@Transactional
	@Override
	public boolean uploadChefImage(long chefId, String imageName, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Chef info = repository.fetchbyId(chefId);
				if (info != null) {
					info.setImage(imageName);
					repository.save(info);
					return true;
				}
			}
		} else {
			throw new UserException("User doesn't exist");
		}

		return false;
	}

	
}
