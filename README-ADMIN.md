# FundMeets Admin Analytics Dashboard

## 🔐 Admin Access Setup

This document explains how to set up and access the admin-only analytics dashboard for FundMeets.

### 📍 Access URLs

- **Admin Login**: `http://localhost:3000/admin/login`
- **Analytics Dashboard**: `http://localhost:3000/admin/analytics`

### 🛡️ Security Features

1. **Admin-Only Access**: Analytics are restricted to users with ADMIN role
2. **JWT Authentication**: Secure token-based authentication
3. **Protected Routes**: All admin routes require authentication
4. **Data Export**: CSV export functionality for reports
5. **Real-time Refresh**: Live data updates

### 🚀 Quick Setup

#### 1. Create Admin User in Database

```sql
-- Add an admin user to your database
INSERT INTO "User" (id, email, role, "newUser", "createdAt", "updatedAt")
VALUES ('admin-123', 'admin@fundmeets.com', 'ADMIN', false, NOW(), NOW());
```

#### 2. Start the Application

```bash
# Backend (Terminal 1)
cd FundMeetsBackend-main
npm run start:dev

# Frontend (Terminal 2)
cd FundMeetsFrontend
npm run dev
```

#### 3. Access Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Login with admin credentials
3. Access analytics at `http://localhost:3000/admin/analytics`

### 📊 Available Metrics

#### User Activity
- Sign-ups per day/week/month
- Active users and retention rates
- Churn rate calculation
- Profile completion rates

#### Matching & Engagement
- Interest request statistics
- Match success rates
- Deal room completion rates
- Average engagement per user

#### Financial Insights
- Total funding sought
- Average funding amounts
- Check sizes and valuations
- Funding distribution by stage

#### Ecosystem Distribution
- Industry breakdowns
- Geographic distribution
- Startup stage analysis
- Investor type distribution

#### Platform Performance
- Conversion rates
- Success metrics
- Growth trends
- User behavior patterns

### 🔧 API Endpoints

All analytics endpoints are protected and require admin authentication:

```
GET /analytics/dashboard          # Complete overview
GET /analytics/user-activity      # User metrics
GET /analytics/enhanced-matching  # Matching performance
GET /analytics/content-interaction # Content metrics
GET /analytics/ecosystem-distribution # Distribution data
GET /analytics/monetization       # Revenue metrics
GET /analytics/enhanced-financial # Financial insights
GET /analytics/trends            # Growth trends
```

### 📈 Dashboard Features

#### Overview Tab
- Key metrics summary
- Quick insights
- Performance indicators

#### Users Tab
- User growth trends
- Retention analysis
- Profile completion rates
- Activity metrics

#### Matching Tab
- Interest conversion rates
- Match success rates
- Engagement metrics
- Performance indicators

#### Financial Tab
- Funding overview
- Valuation analysis
- Check size distribution
- Revenue insights

#### Ecosystem Tab
- Industry distribution
- Geographic spread
- Stage analysis
- Investor types

#### Monetization Tab
- Premium user metrics
- Revenue tracking
- Growth trends
- Conversion rates

### 🔒 Security Considerations

1. **Environment Variables**: Set up proper JWT secrets
2. **Admin Authentication**: Implement proper password hashing
3. **Rate Limiting**: Add rate limiting to admin endpoints
4. **Audit Logging**: Log all admin actions
5. **Data Encryption**: Encrypt sensitive analytics data

### 🛠️ Customization

#### Adding New Metrics

1. Update `analytics.service.ts` with new calculation methods
2. Add corresponding API endpoints in `analytics.controller.ts`
3. Update the frontend dashboard component
4. Add new visualizations as needed

#### Export Functionality

The dashboard includes CSV export functionality for:
- User activity data
- Matching performance
- Financial metrics
- Ecosystem distribution
- Growth trends

### 📱 Mobile Responsiveness

The admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

### 🚨 Troubleshooting

#### Common Issues

1. **Authentication Errors**: Check admin user exists in database
2. **Data Not Loading**: Verify API endpoints are running
3. **Permission Denied**: Ensure user has ADMIN role
4. **Export Issues**: Check browser download permissions

#### Debug Steps

1. Check browser console for errors
2. Verify API responses in Network tab
3. Check backend logs for authentication issues
4. Ensure database connection is working

### 📞 Support

For technical support or questions about the admin dashboard:
- Check the console logs for error messages
- Verify all environment variables are set
- Ensure database connectivity
- Check API endpoint responses

---

**Note**: This dashboard contains sensitive platform data and should only be accessible to authorized administrators. Ensure proper security measures are in place before deploying to production.
