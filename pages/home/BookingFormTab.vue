<template>
  <div class="booking-forms mt-5 mb-5">
        <h2 class="home-wrap-title">Pre Booking Form</h2>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <!-- <div class="contact-form">
      <form action="#">
      <div class="form-wrapper">
      <div class="con-input-wrap">
      <label for="name">Name*</label>
      <input type="text" id="name" class="form-control" />
      </div>
      <div class="con-input-wrap">
      <label for="email">Email Address*</label>
      <input type="email" id="email" class="form-control" />
      </div>
      <div class="con-input-wrap">
      <div class="input-wrap">
      <label for="reason">Reason*</label>
      <div class="select-wrap">
        <select id="reason" class="form-control">
          <option>demo</option>
          <option>demo</option>
        </select>
      </div>
      </div>
      </div>
      <div class="con-input-wrap">
      <label for="message">Message*</label>
      <textarea id="message" rows="15"></textarea>
      </div>
      </div>
      <div class="wrap-btn">
      <a href="#!" class="btn banner-btn"><span>Submit</span></a>
      </div>
      </form>
      </div> -->
        <div
          data-tf-widget="avJ1ASKQ"
          data-tf-iframe-props="title=Pre Booking Form"
          data-tf-medium="snippet"
          style="width: 100%; height: 400px"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    link:{
      type:String,
      default: null,
    }
  },
  head() {
    return {
      script: [
        {
          src: "//embed.typeform.com/next/embed.js",
          async: true,
        },
      ],
    };
  },
};
</script>
