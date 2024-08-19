<template>
    <div >
        <n-card class="login-container">
            <template #title>
                <n-space>
                    <n-icon name="user" />
                    <span>登录</span>
                </n-space>
            </template>
            <n-space vertical>
                <n-input v-model:value="phone" type="text" placeholder="Username" />
                <n-input v-model:value="password" type="password" placeholder="Password" />
            </n-space>
            <button type="submit" @click = login()>Login</button>
        </n-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";
// 使用 ref 声明响应式变量
const phone = ref('');
const password = ref('');
const router = useRouter();

// 定义 login 函数
const login = async () => {
    try {
        const response = await axios.post('http://localhost:51801/api/v1/login/login_auth', {
            phone: phone.value,
            password: password.value
        });
        console.log(response);

        // 确保从API接收到的token是有效的
        if (response.data) {
            // 将token存储到localStorage中
            localStorage.setItem('token', response.data.token);
            // 跳转到首页
            router.push("/");
            // 只打印一次token（如果需要）
            console.log('Login successful. Token stored in localStorage:', response.data.data.token);
        } else {
            // 如果token不存在或结构不正确，可以在这里添加错误处理逻辑
            console.error('Invalid token data received from server');
        }
    } catch (err) {
        // 捕获并处理错误，例如显示给用户一个友好的错误消息
        console.error('Login failed:', err);
        // 这里可以添加额外的错误处理逻辑，如显示错误消息给用户
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>