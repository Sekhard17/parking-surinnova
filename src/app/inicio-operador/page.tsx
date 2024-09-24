"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CarFront, LogOut, Search, BarChart, Printer } from 'lucide-react'

export default function OperatorElegantDashboard() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const operatorName = "Juan Pérez"

  const menuItems = [
    { icon: <CarFront className="h-8 w-8" />, title: "Entrada", description: "Ingresar un vehículo al sistema", color: "from-blue-400 to-blue-600" },
    { icon: <LogOut className="h-8 w-8" />, title: "Salida", description: "Generar cobro por estacionamiento", color: "from-green-400 to-green-600" },
    { icon: <Search className="h-8 w-8" />, title: "Buscar", description: "Buscar deudas de un vehículo", color: "from-yellow-400 to-yellow-600" },
    { icon: <BarChart className="h-8 w-8" />, title: "Reportes", description: "Ver e imprimir reportes", color: "from-purple-400 to-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={operatorName} />
            <AvatarFallback>{operatorName[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{operatorName}</span>
        </motion.div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className={`w-full h-40 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br ${item.color} text-white`}
                  onClick={() => item.title === "Reportes" ? setIsReportModalOpen(true) : null}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="font-semibold">{item.title}</span>
                  <p className="text-xs text-center px-2">{item.description}</p>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reporte de Ganancias</DialogTitle>
          </DialogHeader>
          <ReportContent />
        </DialogContent>
      </Dialog>

      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-lg"
      >
        <div className="flex justify-around p-2">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={`flex flex-col items-center ${activeTab === item.title.toLowerCase() ? 'text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(item.title.toLowerCase())}
            >
              <div className="text-2xl mb-1">
                {React.cloneElement(item.icon, { className: "h-8 w-8" })}
              </div>
              <span className="text-xs">{item.title}</span>
            </Button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}

function ReportContent() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Fecha Inicio</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date">Fecha Fin</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-semibold mb-2">Resumen de Ganancias</h3>
        <p>Total de vehículos: 150</p>
        <p>Ganancias totales: $5,250</p>
        <p>Promedio por vehículo: $35</p>
      </div>
      <div className="flex justify-end">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir Reporte
        </Button>
      </div>
    </div>
  )
}