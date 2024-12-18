<script setup>
import Boutton from '@/components/buttons/Boutton.vue'
import ChangeThemeBoutton from '@/components/buttons/ChangeThemeBoutton.vue';
import MenuList from '@/components/list/MenuList.vue';

</script>

<template>
  <header class="flex justify-between space-x-4 p-4 bg-gray-800 text-white">
    <div id="header-right">
      <p>header</p>
    </div>
    <div id="header-left" class="flex">
      <ChangeThemeBoutton :show-text="false"/>
      <MenuList>
        <Boutton :to="'/'" :background="''">
          Home
        </Boutton>
        <Boutton :to="'/exercice'" :background="''">
          Exercice
        </Boutton>
        <Boutton :to="'/cours/create'" :background="''">
          Create Cours
        </Boutton>
      </MenuList>
    </div>
  </header>
</template>

<style scoped>
</style>