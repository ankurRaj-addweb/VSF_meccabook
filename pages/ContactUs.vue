<template>
  <section class="contact">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="breadcrumb-wrapper" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/"> Home </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Contact Us
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="contact-block">
          <div class="left-block">
            <h2 class="pageInfo-title myStyleC" v-if="getContactUs && getContactUs.content">{{getContactUs.content.title}}</h2>
            <div v-if="getContactUs && getContactUs.components && getContactUs.components.middle && getContactUs.components.middle.wysiwyg[0] && getContactUs.components.middle.wysiwyg[0].content" v-html="getContactUs.components.middle.wysiwyg[0].content"></div>
            <div class="contact-form">
              <form action="#" @submit.prevent="showData">
                <div class="form-wrapper">
                  <div class="contact-input-wrap">
                  <base-input
                    type="text"
                    name="Name"
                    autocomplete="given-name"
                    v-model="firstName"
                    :placeholder="$t('Name')"
                  />
                  <span v-if="getAlpha" class="error-msg">Must have Alphabets only</span>
                  <span class="error-msg" v-if="getFirstName">This field is required</span>
                  </div>
                  <div class="contact-input-wrap">
                  <base-input
                    type="text"
                    name="Email Address"
                    autocomplete="Email Address"
                    v-model="email"
                    :placeholder="$t('Email Address')"
                  />
                  <span v-if="getWrongEmail" class="error-msg">Incorrect email address</span>
                  <span class="error-msg" v-if="getBlankEmail">This field is required</span>
                  </div>
                  <div class="input-wrapper">
                    <div class="contact-input-wrap">
                    <div class="input-wrap">
                      <label>Reason*</label>
                      <div class="select-wrap">
                      <select   
                        class="form-control"
                        :options="options"
                        v-model="reason">
                        <option disabled selected value v-if="!selected" />
                        <option
                          v-for="(option, key) in options"
                          :key="key"
                          v-bind="{selected: option === selected}"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    </div>
                    <span class="error-msg" v-if="getBlankReason">This field is required</span>
                    </div>
                    <div class="contact-input-wrap">
                    <base-input-number
                      v-if="isAuthenticated"
                      type="text"
                      name="Order Reference"
                      autocomplete="Order Reference"
                      v-model="orderReference"
                      :placeholder="$t('Order Reference')"
                    />
                    <span class="error-msg" v-if="isAuthenticated && getBlankOrder">This field is required</span>
                  </div>
                  </div>
                  <div class="contact-input-wrap">
                  <base-textarea
                    type="text"
                    name="Message"
                    autocomplete="message"
                    v-model="message"
                    :placeholder="$t('Message*')"
                  />
                  <span class="error-msg" v-if="getMessage">This field is required</span>
                  </div>
                </div>
                <div class="wrap-btn">
                  <base-button parentStyleClass="btn" titleText="submit" />
                </div>
              </form>
            </div>
          </div>
          <!-- <p>{{name}}- {{email}}-{{reason}}-{{message}}</p> -->
        </div>
      </div>
    </div>
    </div>
    <div class="viewImg" v-if="getContactUs && getContactUs.components && getContactUs.components.middle && getContactUs.components.middle.image_title_description[0] && getContactUs.components.middle.image_title_description[0].image && getContactUs.components.middle.image_title_description[0].image.url" >
        <img
          :src="getContactUs.components.middle.image_title_description[0].image.url"
          :alt="getContactUs.components.middle.image_title_description[0].image.alt"
          :title="getContactUs.components.middle.image_title_description[0].title"
        />
    </div>
    <div class="knowledge-point">
      <router-link to="#">
        <span class="knowledge-text">Knowledge points</span>
        <i class="icon-ribbon"></i>
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import BaseInput from '../components/Form/BaseInput.vue';
import BaseTextarea from '../components/Form/BaseTextarea.vue';
import BaseInputNumber from '../components/Form/BaseInputNumber.vue';
import BaseButton from '../components/Button/BaseButton.vue';
import {
	useUser,
} from "@vue-storefront/magento";

export default {
  components: {
    BaseInput,
    BaseTextarea,
    BaseInputNumber,
    BaseButton,
    useUser
  },
  setup() {
    const { isAuthenticated, load: loadUser } = useUser();
    return {
      isAuthenticated
    }
  },
  data () {
    return {
      options: ['demo1', 'demo2', 'demo3', 'demo4'],
      firstName: '',
      email: '',
      reason: '',
      orderReference: '',
      message: '',
      AllFormData: [],
      isBlankName: false,
      isBlankEmail: false,
      isBlankReason: false,
      isBlankOrder: false,
      isBlankMessage: false,
      wrongEmail: false,
      alphaOnly: false,
    };
  },
  props: {
     selected: {
      type: String,
      required: false,
      default: ''
    },
  },
  methods: {
    showData () {
      const formData = {
        first: this.firstName,
        email: this.email,
        reason: this.reason,
        orderReference: this.orderReference,
        message: this.message
      };
      this.isBlankMessage= false; 
      this.isBlankName= false;
      this.isBlankEmail= false;
      this.isBlankReason= false;
      this.isBlankOrder= false;
      this.wrongEmail= false;
      this.alphaOnly= false;

      const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
      if(this.firstName==='') {
        this.isBlankName=true;
        return false;
      }
      else if(!/^[a-z](.*[a-z])?$/igm.test(this.firstName)) {
        this.isBlankName=false;
        this.alphaOnly=true;
        return false;
      } 
      else if(this.email==='') {
        this.alphaOnly=false;
        this.isBlankEmail=true;
        return false;
      } 
      else if (!emailRe.test(this.email) && this.email!=='') {
        this.alphaOnly=false;
        this.isBlankEmail=false;
        this.wrongEmail = true;
        return false;
      } 
      else if(this.reason==='') {
        this.isBlankEmail=false; 
        this.wrongEmail = false;
        this.isBlankReason=true; 
        return false;
      } 
      else if(this.orderReference==='' && this.isAuthenticated) {
          this.isBlankReason=false; 
          this.isBlankOrder=true; 
          return false;
      } 
      else if (this.message==='') {
        this.isBlankOrder=false; 
        this.isBlankReason=false; 
        this.isBlankMessage=true; 
        return false;
      }
      else {
        axios.post(`https://meccamagento.addwebprojects.com/rest/V1/contactus?contactForm[name]=${this.firstName} AddWeb&contactForm[email] =${this.email}&contactForm[telephone]=9878455623&contactForm[comment]=This is test&contactForm[reason]=${this.reason}&contactForm[order_id]=${this.orderReference}`).then(response => console.log(response));;

      // console.log("type",typeof(formData));

        this.AllFormData.push(formData);
        this.firstName = "";
        this.email = "";
        this.orderReference = "";
        this.reason = "";
        this.message = "";
        this.isBlankMessage = false; 
        this.isBlankName = false;
        this.isBlankEmail = false;
        this.isBlankReason = false;
        this.isBlankOrder = false;
        this.wrongEmail = false;
        this.alphaOnly = false;
        
        console.log(
          "click me",
          this.AllFormData
        );
      } 
    },
    ...mapActions("drupalcms", ["fetchContactUs"]),
  },
  computed: {
    ...mapGetters("drupalcms", ["getContactUs"]),
    getFirstName() {
      return this.isBlankName
    },
    getMessage() {
      return this.isBlankMessage
    },
    getBlankEmail() {
      return this.isBlankEmail
    },
    getBlankReason() {
      return this.isBlankReason
    },
    getBlankOrder() {
      return this.isBlankOrder
    },
    getWrongEmail() {
      return this.wrongEmail
    },
    getAlpha() {
      return this.alphaOnly
    }
  },
  mounted() {
    this.fetchContactUs();
  },
};
</script>

<style lang="scss" scoped>
// @import "/assets/css/base-components/_mixin.scss";
// @import "/assets/css/base-components/_contact.scss";

.pageInfo-title {
  font-size: 2.25rem;
  font-family: "leksa", serif;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 1.4;
  letter-spacing: -0.05em;
  color: #2c354e;
}
@media all and (min-width: 1200px) {
  h2.about-title,
  h2.info-title,
  .pageInfo-title {
    font-size: 3rem;
    line-height: 1.09;
    letter-spacing: -0.065em;
    font-weight: 400;
    margin-bottom: 20px;
  }
}
h6.desc-title {
  font-size: 1.25rem;
  line-height: 1.2;
  font-family: "leksa", serif;
  margin-bottom: 14px;
  letter-spacing: -0.035em;
  color: #2C354E;
  margin-bottom: 20px;
}
@media all and (min-width: 992px) {
  h6.desc-title {
    font-size: 1.5rem;
    font-weight: 400;
  }
}
.error-msg {
  color: red;
  position: absolute;
  top: 100%;
  left: 1px;
}
.contact-input-wrap {
  position: relative;
}
.input-wrapper {
  .contact-input-wrap {
      width: 50%;
      @media all and (max-width: 991px) {
        width: 100%;
      }
      .input-wrap {
        width: 98%;
        @media all and (max-width: 991px) {
        width: 100%;
      }
      }
  }
}
.contact {
  position: relative;
  padding: 0 0 110px;
}
.viewImg img {
  height: 90.5%;
  @media all and (max-width: 768px) {
     display: none;
  }
}
.has-no {
  color: #4B4C4D;
  font-size: 16px;
}
</style>