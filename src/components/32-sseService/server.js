import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

// SSE 路由
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream') // 核心代码指定响应类型为SSE
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const message =
    '爱国，是中华民族五千年文明积淀下来的精神财富，是每一个中国人内心最深沉、最真挚的情感。它不仅仅体现在战火纷飞中的英勇牺牲，也存在于日常生活中的点滴行动。爱国，是一种责任，更是一种信仰。古往今来，无数仁人志士用生命和热血诠释了什么是真正的爱国精神。屈原投江明志，岳飞精忠报国，林则徐虎门销烟……他们用自己的行动甚至生命捍卫国家尊严，守护民族利益。他们的事迹穿越历史长河，至今仍激励着我们前行。在新时代，爱国精神并未褪色，而是以更加多样、更加贴近生活的方式延续。它是科学家默默耕耘、攻克技术难关的坚持；是医生救死扶伤、守护人民健康的担当；是教师教书育人、培养祖国未来的奉献；也是普通人遵纪守法、热爱岗位、服务社会的责任。对于我们青少年来说，爱国并不遥远，也不空洞。它可以从身边的小事做起：认真对待每一次升旗仪式，高唱国歌；努力学习科学文化知识，为将来建设祖国打下基础；尊重他人，爱护环境，做一个有责任感的公民。这些看似平凡的行为，其实都是爱国的具体体现。爱国，不只是口号，更是行动。它不需要轰轰烈烈，而在于日积月累的坚持与热爱。当我们把对祖国的热爱融入到每一天的学习、工作和生活中，就是在为祖国的发展贡献自己的力量。让我们从现在做起，从小事做起，把爱国之情化为实际行动，为实现中华民族的伟大复兴而不懈奋斗！'

  let i = 0
  const interval = setInterval(() => {
    if (i < message.length) {
      res.write(`data: ${JSON.stringify(message[i])}\n\n`)
      i++
    } else {
      clearInterval(interval)
      res.end()
    }
  }, 50) // 控制每字间隔时间（毫秒）
})

app.listen(4000, () => {
  console.log('SSE server running on http://localhost:4000')
})
