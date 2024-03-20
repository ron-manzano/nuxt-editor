<template>
  <div class="doc-container">
    <doc-heading
      :heading-content="headingContent"
      :chunk-content="chunkContent"
    />
    <doc-heading
      :heading-content="headingContent"
      :chunk-content="chunkContent"
    />
  </div>
</template>

<script setup>
const headingContent = "<h1>Test</h1>";
const chunkContent = "<p>Test</p>";
</script>
<style scoped>
.doc-container {
  width: 100%;
  min-height: 100%;
}

.word-processor-content {
  margin: auto; /* Adjust margin for spacing from the top */
  width: 80%; /* Adjust the width as needed */
  max-width: 1200px; /* Set maximum width if desired */
  /* background-color: #fff; */
  padding: 20px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  height: 100vh; /* Ensure content expands to fit the available space */
}
</style>
