<template>
  <li>
    <button
      @click="showSubmenuToggle"
      class="dropdown-item has-submenu"
      :class="{ active: showSubmenu }"
      href="#!"
    >
      History & Politics
    </button>
    <div class="third-lavelmenu">
      <ul>
        <li>
          <strong class="backto-main third-back d-block d-md-none"
            ><button @click="showSubmenuToggle" href="#!" class="back-to">
              <img src="/assets/meccabook/down-arrow-2.svg" alt="" /></button
            >History & Politics</strong
          >
        </li>
        <li>
          <a href="#!" class="level-item">Theology / Aqidah</a>
        </li>
        <li>
          <a href="#!" class="level-item">Belief & Afterlife</a>
        </li>
        <li><a href="#!" class="level-item">Hadith</a></li>
        <li><a href="#!" class="level-item">Tawheed</a></li>
        <li>
          <a href="#!" class="level-item">Fiqh (Jurisprudence)</a>
        </li>
        <li>
          <a href="#!" class="level-item">Religious Theory</a>
        </li>
        <li>
          <a href="#!" class="level-item">Introduction to Islam</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#!" class="level-item">Comparative Religion</a>
        </li>
        <li>
          <a href="#!" class="level-item">Philosophy</a>
        </li>
        <li>
          <a href="#!" class="level-item">Interfaith</a>
        </li>
        <li>
          <a href="#!" class="level-item">Women in Islam</a>
        </li>
      </ul>
    </div>
  </li>
</template>
