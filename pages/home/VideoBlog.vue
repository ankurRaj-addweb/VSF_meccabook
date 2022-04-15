<template>
<div class="video-block">
  
  
  <iframe width="640" height="360" :src="getvideo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

</template>
<script>
export default {
  props:["videoLink"]
  ,data(){
    return{
      video:"https://www.youtube.com/embed/BHACKCNDMW8"
    }
  },
  computed:{
    getvideo(){
      // this.videolink = 'https://www.youtube.com/watch?v=4oV65GVVits'
      const result = this.videoLink.replace("watch?v=","embed/")
      this.video = result;
      return result
    }
    
  },
  
}
</script>