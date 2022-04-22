<template>
  <div>
    <div v-if="getProductDetail && getProductDetail.isbn" class="list-rw">
      <span class="list-head">EAN 13 / ISBN </span>
      <span v-if="getProductDetail && getProductDetail.isbn" class="list-desc">{{ getProductDetail.isbn }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.url_path" class="list-rw">
      <span class="list-head">Url path </span>
      <span v-if="getProductDetail && getProductDetail.url_path" class="list-desc">{{ getProductDetail.url_path }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.manufacturer" class="list-rw">
      <span class="list-head">Manufacturer </span>
      <span v-if="getProductDetail && getProductDetail.manufacturer" class="list-desc">{{ getProductDetail.manufacturer }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.binding" class="list-rw">
      <span class="list-head">Binding </span>
      <span v-if="getProductDetail && getProductDetail.binding" class="list-desc">{{ getProductDetail.binding }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.required_options" class="list-rw">
      <span class="list-head">Required options </span>
      <span v-if="getProductDetail && getProductDetail.required_options" class="list-desc">{{ getProductDetail.required_options }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.author_3nd" class="list-rw">
      <span class="list-head">Author</span>
      <span v-if="getProductDetail && getProductDetail.author_3nd" class="list-desc">{{ getProductDetail.author_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.translator_3nd" class="list-rw">
      <span class="list-head">Translator </span>
      <span v-if="getProductDetail && getProductDetail.translator_3nd" class="list-desc">{{ getProductDetail.translator_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.has_options" class="list-rw">
      <span class="list-head">Has options </span>
      <span v-if="getProductDetail && getProductDetail.has_options" class="list-desc">{{ getProductDetail.has_options }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.editor" class="list-rw">
      <span class="list-head">Editor </span>
      <span v-if="getProductDetail && getProductDetail.editor" class="list-desc">{{ getProductDetail.editor }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.image_label" class="list-rw">
      <span class="list-head">Image label </span>
      <span v-if="getProductDetail && getProductDetail.image_label" class="list-desc">{{ getProductDetail.image_label }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.small_image_label" class="list-rw">
      <span class="list-head">Small image label </span>
      <span v-if="getProductDetail && getProductDetail.small_image_label" class="list-desc">{{ getProductDetail.small_image_label }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.thumbnail_label" class="list-rw">
      <span class="list-head">Thumbnail label </span>
      <span v-if="getProductDetail && getProductDetail.thumbnail_label" class="list-desc">{{ getProductDetail.thumbnail_label }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.foreword_2nd" class="list-rw">
      <span class="list-head">Foreword </span>
      <span v-if="getProductDetail && getProductDetail.foreword_2nd" class="list-desc">{{ getProductDetail.foreword_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.created_at" class="list-rw">
      <span class="list-head">Created at </span>
      <span v-if="getProductDetail && getProductDetail.created_at" class="list-desc">{{ getProductDetail.created_at }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.updated_at" class="list-rw">
      <span class="list-head">Updated at </span>
      <span v-if="getProductDetail && getProductDetail.updated_at" class="list-desc">{{ getProductDetail.updated_at }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.commentator_3nd" class="list-rw">
      <span class="list-head">Commentator </span>
      <span v-if="getProductDetail && getProductDetail.commentator_3nd" class="list-desc">{{ getProductDetail.commentator_3nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.artist_2nd" class="list-rw">
      <span class="list-head">Artist </span>
      <span v-if="getProductDetail && getProductDetail.artist_2nd" class="list-desc">{{ getProductDetail.artist_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.publisher" class="list-rw">
      <span class="list-head">Publisher</span>
      <span v-if="getProductDetail && getProductDetail.publisher" class="list-desc">{{ getProductDetail.publisher }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.illustrator_2nd" class="list-rw">
      <span class="list-head">Illustrator </span>
      <span v-if="getProductDetail && getProductDetail.illustrator_2nd" class="list-desc">{{ getProductDetail.illustrator_2nd }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.pages" class="list-rw">
      <span class="list-head">Pages</span>
      <span v-if="getProductDetail && getProductDetail.pages" class="list-desc">{{ getProductDetail.pages }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.length" class="list-rw">
      <span class="list-head">Length</span>
      <span v-if="getProductDetail && getProductDetail.length" class="list-desc">{{ getProductDetail.length }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.width" class="list-rw">
      <span class="list-head">Width</span>
      <span v-if="getProductDetail && getProductDetail.width" class="list-desc">{{ getProductDetail.width }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.height" class="list-rw">
      <span class="list-head">Height</span>
      <span v-if="getProductDetail && getProductDetail.height" class="list-desc">{{ getProductDetail.height }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.media_type" class="list-rw">
      <span class="list-head">Media type</span>
      <span v-if="getProductDetail && getProductDetail.media_type" class="list-desc">{{ getProductDetail.media_type }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.year_published" class="list-rw">
      <span class="list-head">Year Published</span>
      <span v-if="getProductDetail && getProductDetail.year_published" class="list-desc">{{ getProductDetail.year_published }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.country_of_manufacture && (getProductDetail.country_of_manufacture !== '')" class="list-rw">
      <span class="list-head">Country of manufacture</span>
      <span v-if="getProductDetail && getProductDetail.country_of_manufacture && getProductDetail.country_of_manufacture !== '' " class="list-desc">{{ getProductDetail.country_of_manufacture }}</span>
    </div>
    <!-- <div class="list-rw">
      <span class="list-head">Dimensions</span>
      <span class="list-desc">XXXX</span>
    </div> -->
    <div v-if="getProductDetail && getProductDetail.weight" class="list-rw">
      <span class="list-head">Weight</span>
      <span v-if="getProductDetail && getProductDetail.weight" class="list-desc">{{ getProductDetail.weight }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.weight_type" class="list-rw">
      <span class="list-head">Weight type</span>
      <span v-if="getProductDetail && getProductDetail.weight_type" class="list-desc">{{ getProductDetail.weight_type }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.visibility" class="list-rw">
      <span class="list-head">Visibility</span>
      <span v-if="getProductDetail && getProductDetail.visibility" class="list-desc">{{ getProductDetail.visibility }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.news_from_date" class="list-rw">
      <span class="list-head">News from date</span>
      <span v-if="getProductDetail && getProductDetail.news_from_date" class="list-desc">{{ getProductDetail.news_from_date }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.news_to_date" class="list-rw">
      <span class="list-head">News to date</span>
      <span v-if="getProductDetail && getProductDetail.news_to_date" class="list-desc">{{ getProductDetail.news_to_date }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.easyship_height" class="list-rw">
      <span class="list-head">Easyship height</span>
      <span v-if="getProductDetail && getProductDetail.easyship_height" class="list-desc">{{ getProductDetail.easyship_height }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.easyship_width" class="list-rw">
      <span class="list-head">Easyship width</span>
      <span v-if="getProductDetail && getProductDetail.easyship_width" class="list-desc">{{ getProductDetail.easyship_width }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.easyship_length" class="list-rw">
      <span class="list-head">Easyship length</span>
      <span v-if="getProductDetail && getProductDetail.easyship_length" class="list-desc">{{ getProductDetail.easyship_length }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.easyship_category" class="list-rw">
      <span class="list-head">Easyship category</span>
      <span v-if="getProductDetail && getProductDetail.easyship_category" class="list-desc">{{ getProductDetail.easyship_category }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.format" class="list-rw">
      <span class="list-head">Format</span>
      <span v-if="getProductDetail && getProductDetail.format" class="list-desc">{{ getProductDetail.format }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.links_purchased_separately" class="list-rw">
      <span class="list-head">Links purchased separately</span>
      <span v-if="getProductDetail && getProductDetail.links_purchased_separately" class="list-desc">{{ getProductDetail.links_purchased_separately }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.samples_title" class="list-rw">
      <span class="list-head">Samples title</span>
      <span v-if="getProductDetail && getProductDetail.samples_title" class="list-desc">{{ getProductDetail.samples_title }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.links_title" class="list-rw">
      <span class="list-head">Links title</span>
      <span v-if="getProductDetail && getProductDetail.links_title" class="list-desc">{{ getProductDetail.links_title }}</span>
    </div>
    <div v-if="getProductDetail && getProductDetail.links_exist" class="list-rw">
      <span class="list-head">Links exist</span>
      <span v-if="getProductDetail && getProductDetail.links_exist" class="list-desc">{{ getProductDetail.links_exist }}</span>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props:  {
    productsku: {
      type: String,
      default: null
    }
    },
   computed: {
    ...mapGetters("drupalcms", ["getProductDetail"]),
  }
    
}
</script>
