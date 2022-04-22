<template>
  <div class="share-wrap">
    <a class="a2a_dd" href="https://www.addtoany.com/share">
      <i class="icon-share"></i>
      <span class="text">Share with friends</span>
    </a>
  </div>
</template>

<script>
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://static.addtoany.com/menu/page.js"
      );
    document.head.appendChild(recaptchaScript);
  }
}
</script>
