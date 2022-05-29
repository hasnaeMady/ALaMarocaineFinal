package com.bridgelabz.alamarocaine.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.bridgelabz.alamarocaine.dto.RatingReviewDTO;

@Entity
@Table(name = "review_and_rating")
public class ReviewAndRating {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ratingReviewId;

	@Column(name = "rating", nullable = false)
	private Integer rating;

	@Column(name = "review", nullable = false)
	private String review;

	@Column(name = "name")
	private String userName;

	@Column(name = "plat_id", nullable = false)
	private long platId;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public long getPlatId() {
		return platId;
	}

	public void setPlatId(long platId) {
		this.platId = platId;
	}

	public ReviewAndRating() {
	}

	/*
	 * ReviewAndRating
	 * 
	 * 
	 * ??????????????????????????
	 * 
	 **/
	public ReviewAndRating(RatingReviewDTO rrDTO) {
		this.rating = rrDTO.getRating();
		this.review = rrDTO.getReview();
	}

	public Long getRatingReviewId() {
		return ratingReviewId;
	}

	public void setRatingReviewId(long ratingReviewId) {
		this.ratingReviewId = ratingReviewId;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public void setRatingReviewId(Long ratingReviewId) {
		this.ratingReviewId = ratingReviewId;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

}
