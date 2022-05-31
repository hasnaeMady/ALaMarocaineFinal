package com.bridgelabz.alamarocaine.implementation;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bridgelabz.alamarocaine.dto.EditPlatDto;
import com.bridgelabz.alamarocaine.dto.PlatDto;
import com.bridgelabz.alamarocaine.dto.RatingReviewDTO;
import com.bridgelabz.alamarocaine.entity.Plat;
import com.bridgelabz.alamarocaine.entity.ReviewAndRating;
import com.bridgelabz.alamarocaine.entity.Users;
import com.bridgelabz.alamarocaine.exception.PlatAlreadyExist;
import com.bridgelabz.alamarocaine.exception.UserException;
import com.bridgelabz.alamarocaine.repository.AddressRepository;
import com.bridgelabz.alamarocaine.repository.IUserRepository;
import com.bridgelabz.alamarocaine.repository.PlatImple;
import com.bridgelabz.alamarocaine.repository.ReviewRatingRepository;
import com.bridgelabz.alamarocaine.response.EmailData;
import com.bridgelabz.alamarocaine.service.IPlatService;
import com.bridgelabz.alamarocaine.util.EmailProviderService;
import com.bridgelabz.alamarocaine.util.JwtGenerator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PlatServiceImplementation implements IPlatService {
	private Plat platinformation = new Plat();
	private ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private EmailProviderService em;
	@Autowired
	private EmailData emailData;

	@Autowired
	private PlatImple repository;

	@Autowired
	private IUserRepository userRepository;
	@Autowired
	AddressRepository addrepository;

	@Autowired
	private JwtGenerator generate;

	@Autowired
	private ReviewRatingRepository rrRepository;

	@Autowired
	private WishlistImplementation WishServiceNotify;

	@Transactional
	@Override

	public boolean addPlats(String imageName, PlatDto information, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;
			if (fetchRole.equals("seller")) {
				Plat plat = repository.fetchbyPlatName(information.getPlatName());
				System.out.println("Plat name " + information.getPlatName());
				if (plat == null) {
					platinformation = modelMapper.map(information, Plat.class);
					platinformation.setPlatName(information.getPlatName());////////
					platinformation.setChefName(information.getChefName());//////
					platinformation.setPrice(information.getPrice());
					platinformation.setImage(imageName);
					platinformation.setStatus("Approved");
					platinformation.setNoOfPlats(information.getNoOfPlats());//////////
					platinformation.setCreatedDateAndTime(LocalDateTime.now());
					platinformation.setUserId(id);
					repository.save(platinformation);
					return true;
				} else {
					throw new PlatAlreadyExist("Plat is already exist Exception..");
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
	public List<Plat> getPlatInfo(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Plat> plats = repository.getAllPlats(id);/////
			return plats;
		} else {
			throw new UserException("User doesn't exist");
		}

	}

	public double getOriginalPrice(double price, long quantity) {
		long result = (long) (price / quantity);
		return result;
	}

	@Override
	public Plat getTotalPriceofPlat(Long platId, long quantity) {
		Plat platinfo = repository.fetchbyId(platId);
		double Price = platinfo.getPrice();

		long Quantity = quantity;

		if (Quantity <= platinfo.getNoOfPlats() || Quantity >= platinfo.getNoOfPlats()) {
			if (platinfo != null && quantity > 0) {
				double price = getOriginalPrice(Price, platinfo.getNoOfPlats());
				double totalPrice = (price * Quantity);
				platinfo.setNoOfPlats(quantity);

				platinfo.setNoOfPlats(quantity);

				platinfo.setPrice(totalPrice);
				repository.save(platinfo);
				return platinfo;
			} else if (platinfo != null && quantity < 1) {
				double price = getOriginalPrice(Price, platinfo.getNoOfPlats());
				double totalPrice = (price * 1);
				platinfo.setNoOfPlats(quantity);
				platinfo.setPrice(totalPrice);
				repository.save(platinfo);
				return platinfo;
			}
		}
		return null;
	}

	@Transactional
	@Override
	public List<Plat> sortGetAllPlats() {
		List<Plat> list = repository.findAll();
		list.sort((Plat plat1, Plat plat2) -> plat1.getCreatedDateAndTime().compareTo(plat2.getCreatedDateAndTime()));
		return list;
	}

	@Override
	public List<Plat> sorting(boolean value) {
		List<Plat> list = repository.findAll();
		if (value == true) {
			list.sort((Plat plat1, Plat plat2) -> plat1.getPrice().compareTo(plat2.getPrice()));
			return list;
		} else {
			list.sort((Plat book1, Plat book2) -> book1.getPrice().compareTo(book2.getPrice()));
			Collections.reverse(list);
			return list;
		}
	}

	@Override
	public List<Plat> findAllPageBySize(int pagenumber) {
		long count = repository.count();
		int pageSize = 2;
		int pages = (int) ((count / pageSize));
		int i = pagenumber; // i should start with zero or 0...
		while (i <= pages) {
			List<Plat> list = repository.findAllPage(PageRequest.of(i, pageSize));
			i++;
			return list;
		}
		return null;
	}

	@Override
	public Plat getPlatbyId(Long platId) {
		Plat info = repository.fetchbyId(platId);
		if (info != null) {
			return info;
		}
		return null;
	}

	@Override

	public boolean editPlat(long platId, EditPlatDto information, String token) {

		Long id;
		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Plat info = repository.fetchbyId(platId);
				if (info != null) {
					Long l = info.getNoOfPlats();
					int beforeNoOfplats = l.intValue();
					// log.info("------------------------"+beforeNoOfbooks);
					info.setPlatId(platId);
					info.setPlatName(information.getPlatName());
					info.setNoOfPlats(information.getNoOfPlats());
					info.setPrice(information.getPrice());
					info.setChefName(information.getChefName());
					info.setPlatDescription(information.getPlatDescription());
//						info.setImage(imageName);
					info.setUpdatedDateAndTime(information.getUpdatedAt());

					Long af = info.getNoOfPlats();
					int afterNoOfplats = af.intValue();
					// log.info("------------------------"+afterNoOfbooks);
//						if(after==before) {
//						
//						}

//						for (WishlistBook w : userInfo.getWishlistBook()) {
//							for(Book wishbook :w.getBooksList()) {
//						
//							if(wishbook.getBookId()==bookId) {
					if (beforeNoOfplats == 0) {
						// log.info("------------------------"+afterNoOfbooks);

						if (afterNoOfplats > beforeNoOfplats) {
							WishServiceNotify.setNotifyWishplats(true);
							if (WishServiceNotify.isNotifyWishplats() == true) {
//									Users userdetails=new Users();

//									emailData.setEmail(userdetails.getEmail());

								String body = "<html> \n"

										+ "<h3 ; style=\"background-color:#00302e;color:#ffffff;\" >\n "
										+ "<center>A La Marocaine</center> " + "</h3>\n "
										+ "<body  style=\"background-color:#b6d7a8;\">\n" + "<br>"
										+ "votre plat pr�f�r� est disponible:" + info.getPlatName() + "\n"
										+ "   v�rifiez votre plat sur le lien ci-dessous:<br>" + "\n" + " http://localhost:54670/wish<br>"

										+ "</body>" + " </html>";

								emailData.setSubject("Notification dans la liste des souhaits");

								emailData.setBody(body);

								em.sendMail("sandeepkumarrayala@gmail.com", emailData.getSubject(),
										emailData.getBody());

							}
						}

					}
//							}//if id equating
//							}//wish book
//						}//wishbookw for
					info.setUpdatedDateAndTime(LocalDateTime.now());
					repository.save(info);
					return true;
				}
			} else {
				throw new UserException("Vous n'�tes pas un utilisateur autoris�");
			}
		} else {
			throw new UserException("L'utilisateur n'existe pas");
		}

		return false;
	}

	@Transactional
	@Override
	public boolean deletePlat(long platId, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("le r�le actuel est: " + userRole);
			// log.info("Actual ");
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Plat info = repository.fetchbyId(platId);
				if (info != null) {
					repository.deleteByPlatId(platId);
					return true;
				}
			} else {
				throw new UserException("Vous n'êtes pas un utilisateur autorisé");
			}
		} else {
			throw new UserException("L'utilisateur n'existe pas");
		}

		return false;
	}

	@Transactional
	@Override
	public boolean editPlatStatus(long platId, String status, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		// log.info("");
		if (userInfo != null) {
			Plat info = repository.fetchbyId(platId);
			if (info != null) {
				repository.updatePlatStatusByPlatId(status, platId);
				return true;
			}
		} else {
			throw new UserException("L'utilisateur n'existe pas");
		}

		return false;
	}

	@Transactional
	@Override
	public List<Plat> getAllOnHoldPlats(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Plat> approvedOnHoldPlats = repository.getAllOnHoldPlats();
			return approvedOnHoldPlats;
		} else {
			throw new UserException("L'utilisateur n'existe pas");
		}

	}

	public List<Plat> getAllRejectedPlats(String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			List<Plat> rejectedPlats = repository.getAllRejectedPlats();
			return rejectedPlats;
		} else {
			throw new UserException("L'utilisateur n'existe pas");
		}

	}

	
	@Override
	public Page<Plat> getPlatAproval(Optional<String> searchBy, Optional<Integer> page, Optional<String> sortBy,
			Optional<String> order) {
		if (order.equals(Optional.ofNullable("asc"))) {
			return repository.findByPlatName(searchBy.orElse("_"),
					PageRequest.of(page.orElse(0), 12, Sort.Direction.ASC, sortBy.orElse("plat_id")));
		} else {
			return repository.findByPlatName(searchBy.orElse("_"),
					PageRequest.of(page.orElse(0), 12, Sort.Direction.DESC, sortBy.orElse("plat_id")));
		}
	}

	@Override
	public List<Plat> getAllAprovedPlat() {
		List<Plat> approvedPlats = repository.getAllApprovedPlats();
		return approvedPlats;
	}

	@Override
	public boolean writeReviewAndRating(String token, RatingReviewDTO rrDTO, Long platId) {


		Long userId = generate.parseJWT(token);
		Users user = userRepository.getUserById(userId);
		ReviewAndRating review = rrRepository.getPlatReview(platId, user.getName());
		if (review == null) {
			ReviewAndRating rr = new ReviewAndRating(rrDTO);
			rr.setPlatId(platId);
			rr.setUserName(user.getName());
			rrRepository.save(rr);
			return true;

		}
		return false;

	}

	@Override
	public List<ReviewAndRating> getRatingsOfPlat(Long platId) {


		return rrRepository.getreviews(platId);
	}

	@Override
	public double avgRatingOfPlat(Long platId) {
		double rate = 0.0;
		try {
			rate = repository.avgRateOfPlat(platId);
			System.out.println("rate getted:" + rate);
		} catch (Exception e) {
			System.out.println("No rating");
		}
		return rate;
	}

	@Override
	public Integer getPlatsCount() {

		return repository.getAllApprovedPlats().size();
	}

	@Transactional
	@Override
	public boolean uploadPlatImage(long platId, String imageName, String token) {
		Long id;

		id = (long) generate.parseJWT(token);
		Users userInfo = userRepository.getUserById(id);
		if (userInfo != null) {
			String userRole = userInfo.getRole();
			System.out.println("actual Role is " + userRole);
			String fetchRole = userRole;

			if (fetchRole.equals("seller")) {
				Plat info = repository.fetchbyId(platId);
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

	@Transactional
	@Override
	public List<Plat> sortPlatByRate() {

		List<Plat> plats = repository.getAllApprovedPlats();
		System.out.println("Approved plats:" + plats);
		List<Plat> sortPlat = plats.stream()
				.sorted((plat1, plat2) -> (avgRatingOfPlat(plat1.getPlatId()) < avgRatingOfPlat(plat2.getPlatId())) ? 1
						: (avgRatingOfPlat(plat1.getPlatId()) > avgRatingOfPlat(plat2.getPlatId())) ? -1 : 0)
				.collect(Collectors.toList());
		System.out.println("After sorting:" + sortPlat);
		return sortPlat;
	}

}
