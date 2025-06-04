

// curl -X POST 'https://api.dify.ai/v1/chat-messages' \
// --header 'Authorization: Bearer app-fpL5F9MJdmG5qlvIRcFuOXVj' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "inputs": {},
//     "query": "hello",
//     "response_mode": "blocking",
//     "conversation_id": "",
//     "user": "abc-123"
// }'


async function callDifyAgent(query) {
    console.log("A调用 Dify Agent 开始...");

    const agentId = "33f88390-0157-4986-b8f5-ee43779"; // 替换为你的 Agent ID
    const apiKey = "app-fpL5F9MJdmG5qlvIRcFuOXVj"; // 替换为你的 API 密钥
    const endpoint = `https://api.dify.ai/v1/chat-messages`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}` // 身份验证
            },
            body: JSON.stringify({
                "inputs": {},
                "query": query,
                "response_mode": "blocking",
                "conversation_id": "",
                "user": "abc-123"
            })
        });

        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            console.log(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dify 响应:", data);
        // 提取回答：data.messages[0].content
        return data.answer;
    } catch (error) {
        console.error("调用失败:", error);
        return null;
    }
}
