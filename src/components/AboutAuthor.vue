<template>
  <div class="author-info p-4 h-100 bg-white rounded-lg shadow-lg">
    <div class="mt-6">
      <div class="flex gap-20 flex-col md:flex-row">
        <div class="text-center w-full">
          <h1 class="text-3xl font-bold mb-4 text-blue-500">
            About the author
          </h1>
          <img
            src="@/assets/img/authorImg.png"
            alt="Author Image"
            class="w-40 h-40 rounded-full shadow-md m-auto object-cover"
          />
          <h2 class="text-xl font-bold text-blue-500 mt-2">Jakub Piekarz</h2>
          <p class="text-gray-600">Front-end Developer</p>
          <h2 class="text-lg font-bold mt-6 text-purple-500 mb-5">
            Skills and Competencies:
          </h2>
          <ul
            class="list-disc ml-6 list-inside flex flex-col items-start font-bold text-left"
          >
            <li>
              <span class="font-bold">Programming Languages: </span>
              <span class="text-blue-500">HTML, CSS, JavaScript</span>
            </li>
            <li>
              Frameworks and Libraries:
              <span class="text-blue-500"
                >Vue.js, Vuex, Axios, Typescript, Quasar</span
              >
            </li>
            <li>
              CSS Preprocessors:
              <span class="text-blue-500">Sass, Tailwind CSS</span>
            </li>
            <li>Control Tools: <span class="text-blue-500">Git</span></li>
            <li>Basic knowledge of graphic tools</li>
            <li>Understanding of UI/UX design principles</li>
            <li>Communication and teamwork skills</li>
            <li>Problem-solving and approach to project challenges</li>
            <li>English language proficiency at B2 level</li>
          </ul>
        </div>
        <div class="w-full">
          <div>
            <h1 class="text-3xl font-bold mb-4 text-blue-500">
              About the project
            </h1>

            <p class="text-gray-600">
              This project utilizes the
              <a
                class="text-purple-500"
                href="https://pokeapi.co/"
                target="_blank"
                >PokeAPI</a
              >
              to fetch data about Pokémon, providing an interactive and dynamic
              user experience. You can check repository
              <a
                class="text-purple-500"
                href="https://github.com/KubaPiekarz/pokemon"
                target="_blank"
                >here</a
              >
              (project is continuously evolving and expanding as I explore new
              technologies and enhance its features).
            </p>
          </div>
          <div class="mt-6">
            <h2 class="text-lg font-bold mt-6 text-purple-500 mb-5">
              Tech Stack that I used in this project:
            </h2>
            <ul
              class="list-disc ml-6 list-inside flex flex-col items-start font-bold text-left"
            >
              <li>Vue.js</li>
              <li>Vuex</li>
              <li>Axios</li>
              <li>Tailwind CSS</li>
              <li>Git</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-10 justify-center">
      <a
        href="https://www.linkedin.com/in/jakub-piekarz-96a2b9235/"
        target="_blank"
      >
        <AkLinkedinBoxFill class="text-blue-500 mr-2 text-3xl" />
      </a>
      <a href="https://github.com/KubaPiekarz" target="_blank">
        <AkGithubFill class="text-gray-700 mr-2 text-3xl" />
      </a>
      <a class="text-purple-500 text-xl">jakubpiekarz99@gmail.com</a>
    </div>
  </div>
</template>

<script>
import { AkLinkedinBoxFill, AkGithubFill } from "@kalimahapps/vue-icons";

export default {
  name: "AuthorInfo",
  components: {
    AkLinkedinBoxFill,
    AkGithubFill,
  },
};
</script>

<style scoped></style>
