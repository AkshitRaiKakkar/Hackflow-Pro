import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceChart = ({ data, type = 'bar', title, period = '7d' }) => {
  const chartData = data || [
    { name: 'Mon', registrations: 24, submissions: 18, teams: 12 },
    { name: 'Tue', registrations: 32, submissions: 24, teams: 16 },
    { name: 'Wed', registrations: 28, submissions: 20, teams: 14 },
    { name: 'Thu', registrations: 45, submissions: 35, teams: 22 },
    { name: 'Fri', registrations: 38, submissions: 28, teams: 18 },
    { name: 'Sat', registrations: 52, submissions: 42, teams: 28 },
    { name: 'Sun', registrations: 41, submissions: 32, teams: 21 }
  ];

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-3 border border-border">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="registrations" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="submissions" 
              stroke="var(--color-secondary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="registrations" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="submissions" fill="var(--color-secondary)" radius={[2, 2, 0, 0]} />
          <Bar dataKey="teams" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title || 'Performance Overview'}</h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
            {periods?.map((p) => (
              <button
                key={p?.value}
                className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                  period === p?.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p?.label}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-muted-foreground">Registrations</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-muted-foreground">Submissions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-muted-foreground">Teams</span>
          </div>
        </div>
      </div>
      {renderChart()}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">260</p>
            <p className="text-xs text-muted-foreground">Total Registrations</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">199</p>
            <p className="text-xs text-muted-foreground">Total Submissions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">131</p>
            <p className="text-xs text-muted-foreground">Total Teams</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;