import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  const [tab, setTab] = useState("register");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [apiKey, setApiKey] = useState("");
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);

  const API_BASE = "http://localhost:5001";

  const handleRegister = async () => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  const handleLogin = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    });
    const data = await res.json();
    if (data.api_key) setApiKey(data.api_key);
    alert(data.message || data.error);
  };

  const fetchCountry = async () => {
    const res = await fetch(`${API_BASE}/api/country/${country}`, {
      headers: { "X-API-Key": apiKey }
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else setCountryInfo(data);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">API Middleware Dashboard</h1>
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="country">Get Country Info</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card className="mt-4">
            <CardContent className="space-y-2 py-4">
              <Input
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Button onClick={handleRegister}>Register</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card className="mt-4">
            <CardContent className="space-y-2 py-4">
              <Input
                placeholder="Username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
              <Button onClick={handleLogin}>Login</Button>
              {apiKey && (
                <p className="text-sm text-green-600">API Key: {apiKey}</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="country">
          <Card className="mt-4">
            <CardContent className="space-y-2 py-4">
              <Input
                placeholder="Country name (e.g. Japan)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Button onClick={fetchCountry}>Fetch Country Info</Button>
              {countryInfo && (
                <div className="text-sm bg-gray-100 p-2 rounded mt-2">
                  <pre>{JSON.stringify(countryInfo, null, 2)}</pre>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
