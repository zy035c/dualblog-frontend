
export const logout_description = () => {
    const descriptions = [
        "长路漫漫，唯剑作伴。",
        "欲买桂花同载酒，只是故人，不知何日再见。",
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)];
};


export const login_description = () => {
    const descriptions = [
        "我将以高达形态出击。",
        "西比拉镇压执行系统 使用许诺确认 适正用户。"
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export const delete_acount_description = () => {
    const descriptions = [
        "O K",
        "明日安在？无人能云。",
        "犯罪系数 over 300 将对象完全排除。"
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

export const login_failed_description = () => {
    const descriptions = [
        "我宁愿犯错，也不愿什么都不做。",
        "除了火药以外，什么也没有。",
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}