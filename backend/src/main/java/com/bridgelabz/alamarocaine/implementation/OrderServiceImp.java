package com.bridgelabz.alamarocaine.implementation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.alamarocaine.entity.CartItem;
import com.bridgelabz.alamarocaine.entity.Order;
import com.bridgelabz.alamarocaine.entity.Plat;
import com.bridgelabz.alamarocaine.entity.Quantity;
import com.bridgelabz.alamarocaine.entity.Users;
import com.bridgelabz.alamarocaine.exception.UserException;
import com.bridgelabz.alamarocaine.repository.OrderRepository;
import com.bridgelabz.alamarocaine.repository.PlatImple;
import com.bridgelabz.alamarocaine.repository.UserRepository;
import com.bridgelabz.alamarocaine.response.EmailData;
import com.bridgelabz.alamarocaine.service.ICartService;
import com.bridgelabz.alamarocaine.service.IOrderServices;
import com.bridgelabz.alamarocaine.util.EmailProviderService;
import com.bridgelabz.alamarocaine.util.JwtGenerator;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderServiceImp implements IOrderServices {
	@Autowired
	private JwtGenerator generate;

	@Autowired
	private ICartService cartservice;

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PlatImple platRepository;

	@Autowired
	private EmailProviderService em;
	@Autowired
	private EmailData emailData;

	@Autowired
	OrderRepository orderRepository;

	public Order placeOrder(String token, Long platId, Long addressId) {
		Long id = generate.parseJWT(token);
		Users userdetails = userRepo.findById(id).get();
		if (userdetails != null) {
			Order orderDetails = new Order();
			Random random = new Random();
			ArrayList<Plat> list = new ArrayList<>();
			ArrayList<Quantity> quantitydetails = new ArrayList<>();
			ArrayList<String> details = new ArrayList<>();
			/*
			 * getting user cartbooks to order as a list userdetail.getcatbook return type
			 * is List
			 */
			List<CartItem> cartplat = userdetails.getCartPlats();
			// log.info("------------------------------cartbook------1--"+cartbook);
			/*
			 * now iterating specific cart book
			 */
			List<Plat> userCartplats = null;
			for (CartItem userCart : cartplat) {
				// select specific cart book to order
				// log.info("-----------------------usercart-------------2--"+userCart);
				userCartplats = userCart.getPlatsList();// getting books from cart
				for (Plat plat : userCartplats) {
					// log.info("-----------------------book---------------"+book);
					if (plat.getPlatId().equals(platId))// specific book to order @path taking input of this api
					{
						/*
						 * decreasing the quantity of book
						 */
						long orderId;
						for (Quantity platquantity : userCart.getQuantityOfPlat()) {
							// List q=userCart.getQuantityOfBook();
							// log.info("-----------------------QUantity-------------2--"+bookquantity);
							Long noOfPlats = plat.getNoOfPlats() - platquantity.getQuantityOfPlat();
							plat.setNoOfPlats(noOfPlats);
							Plat bb = platRepository.save(plat);
							try {
								list.add(bb);
								orderId = random.nextInt(1000000);
								if (orderId < 0) {
									orderId = orderId * -1;
								}
								double totalprice = plat.getPrice() * (platquantity.getQuantityOfPlat());
								// log.info("-----------------------QUantity-------------2--"+bookquantity.getQuantityOfBook());
								orderDetails.setTotalPrice(totalprice);
								quantitydetails.add(platquantity);
								orderDetails.setOrderId(orderId);
								orderDetails.setQuantityOfPlats(quantitydetails);
								orderDetails.setOrderPlacedTime(LocalDateTime.now());
								orderDetails.setOrderStatus("pending");
								orderDetails.setAddressId(addressId);
								orderDetails.setPlatsList(list);
								details.add("orderId:" + orderId + "\n" + "PlatName:" + plat.getPlatName() + "\n"
										+ "Quantity:" + platquantity.getQuantityOfPlat() + "\n" + "TotalPrice:"
										+ platquantity.getTotalprice());
							} catch (Exception e) {
								throw new UserException("commande échouée !");
							}
						} // quantity for
					} // if condition checks id of the books

				} // book iteration--for
			} // cart iterate--for
			userdetails.getOrderPlatDetails().add(orderDetails);
			String data = "";
			for (String dt : details) {
				data = data + dt;
				// log.info("\n "+dt);
			}

			Plat plat = platRepository.findById(platId).orElse(null);
			String body = "<html> \n"

					+ "<h3 ; style=\"background-color:#990000;color:#ffffff;\" >\n " + "<center>ALaMarocaine</center> "
					+ "</h3>\n " + "<body  style=\"background-color:#FAF3F1;\">\n"
					+ "<img src=\"E:\\git merge ideation\\final front\\BookStoreFrontend\\src\\assets\\bookimage/"
					+ plat.getImage() + "\" alt=\"platImage\">"

					+ userdetails.getEmail() + " <br>" + "order details <br>" + " \n" + data + "\n"
					+ "please rate us below link<br>" + "\n" + "http://localhost:4200/plats/ratingreview<br>"

					+ "</body>" + " </html>";
			emailData.setEmail(userdetails.getEmail());

			emailData.setSubject("your Order is succefully placed");

			emailData.setBody(body);

			em.sendMail(emailData.getEmail(), emailData.getSubject(), emailData.getBody());
			// em.sendMail(emailData.getEmail(), emailData.getSubject(),
			// emailData.getBody());

			System.out.println("emailData.getEmail() " + emailData.getEmail());
			System.out.println("emailData.getSubject() " + emailData.getSubject());
			System.out.println("emailData.getBody() " + emailData.getBody());
			em.sendMail(emailData.getEmail(), emailData.getSubject(), emailData.getBody());
			System.out.println("rate mail sent after order");
			/*
			 * remove specific book from the cart........
			 */

			if (cartservice.removePlatsFromCart(token, platId)) {
				userRepo.save(userdetails);
				return orderDetails;
			}
		}

		throw new UserException("user not found ");
	}

	@Override
	public boolean confirmPlattoOrder(String token, Long platId) {
		Long id = generate.parseJWT(token);
		Users userdetails = userRepo.findById(id).orElseThrow(null);

		for (Order order : userdetails.getOrderPlatDetails()) {
			boolean notExist = order.getPlatsList().stream().noneMatch(plats -> plats.getPlatId().equals(platId));

			if (!notExist) {
				return true;
			}
		}
		return false;
	}

	@Transactional
	@Override
	public int getCountOfPlats(String token) {
		Long id = generate.parseJWT(token);
		int countOfPlats = 0;
		Users userdetails = userRepo.findById(id).orElseThrow(null);

		List<Order> plats = userdetails.getOrderPlatDetails();
		for (Order cart : plats) {
			if (!cart.getPlatsList().isEmpty()) {

				countOfPlats++;
			}
		}
		return countOfPlats;
	}

	@Transactional
	@Override
	public List<Order> getOrderList(String token) {
		long id = generate.parseJWT(token);
		Users userdetails = userRepo.findById(id).orElseThrow(null);

		return userdetails.getOrderPlatDetails();

	}

	@Transactional
	@Override
	public int changeOrderStatus(String status, long orderId) {

		int changedOrderStatus = orderRepository.OrderStatusdefault(status, orderId);
//		long userId=orderRepository.findUserId(orderId);
//		
//		
//		Users userdetails = userRepo.findById(userId).get();
//		
//		
//		
//		if(changedOrderStatus >0) 
//		{	 
//			String body="";
//				emailData.setEmail(userdetails.getEmail());		
//				emailData.setSubject("Book Store");
//				body=(status.equals("in shipment")) ? "Your Order has been Shipped" : (status.equals("delivered")) ? "Your Order has been Delivered" : "Your order is in Progress"; 
//				
//				emailData.setBody(body);
//				em.sendMail(emailData.getEmail(), emailData.getSubject(), emailData.getBody());
//		}
		return changedOrderStatus;
	}

	public String getstatusresult() {
		return null;

	}

	public List<Order> getallOrders() {

		List<Order> orderIds = orderRepository.getorder();
		return orderIds;
	}

	@Override
	public List<Order> getInProgressOrders() {
		List<Order> inProgressOrder = orderRepository.getInProgressOrder();
		return inProgressOrder;
	}

}