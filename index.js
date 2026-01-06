import express from 'express'

const app = express()
app.use(express.json())

app.post('/min-energy', (req, res) => {
  const cost = req.body.cost

  if (!cost || cost.length < 2) {
    return res.status(400).json({
      error: "Please provide a valid cost array"
    })
  }

  const n = cost.length
  const dp = new Array(n)

  dp[0] = cost[0]
  dp[1] = cost[1]

  for (let i = 2; i < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2])
  }

  res.json({
    minimumEnergyRequired: Math.min(dp[n - 1], dp[n - 2])
  })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
