<template>
  <div class="container max-w-xl mx-auto p-4 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Free ChatBot</h2>

    <div class="form-group mb-3">
      <input
        v-model="input"
        type="text"
        class="form-control w-full border rounded px-3 py-2"
        placeholder="Enter your question"
        :disabled="loading"
      />
    </div>

    <button
        class="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
        @click="sendMessage"
        :disabled="loading"
        >
        {{ loading ? 'Loading...' : 'Ask!' }}
    </button>

    <button
        class="btn bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        @click="refreshChat"
        :disabled="loading"
        >
        Refresh
    </button>


    <div id="response" class="mt-4 whitespace-pre-wrap">
      {{ responseText }}
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
const loading = ref(false)
const responseText = ref('')

const sendMessage = async () => {
  const message = input.value.trim()
  if (!message) {
    responseText.value = '⚠️ Please enter a message.'
    return
  }

  loading.value = true
  responseText.value = 'Please wait...'

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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', // Replace with your key
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Vue Chatbot'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    })

    const data = await res.json()
    const botReply = data?.choices?.[0]?.message?.content || 'No response received.'
    responseText.value = botReply
  } catch (err: any) {
    responseText.value = `Error: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

const refreshChat = () => {
  input.value = ''
  responseText.value = ''
}
</script>


<style scoped>
#response {
  padding: 10px;
  min-height: 60px;
  background-color: #f9f9f9;
  border-radius: 6px;
  white-space: pre-wrap; /* Keeps line breaks */
}
</style>
