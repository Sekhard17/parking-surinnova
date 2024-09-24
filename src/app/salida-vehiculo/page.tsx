"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CarFront, LogOut, Search, BarChart, Printer, Home, User, Calendar, Clock, DollarSign, Timer } from 'lucide-react'

export default function SalidaVehiculo() {
  const [patente, setPatente] = useState('')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)
  const operatorName = "Juan Pérez"

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatPatente = (value: string) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    let formatted = cleaned

    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`
    }
    if (cleaned.length > 4) {
      formatted = `${formatted.slice(0, 5)}-${formatted.slice(5)}`
    }

    return formatted.slice(0, 8)
  }

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPatente = formatPatente(e.target.value)
    setPatente(formattedPatente)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de búsqueda de datos del vehículo
    const mockVehicleData: VehicleData = {
      entryTime: new Date(currentDateTime.getTime() - 2 * 60 * 60 * 1000), // 2 horas antes
      exitTime: currentDateTime,
      tarifa: 1000, // Tarifa por hora en pesos chilenos
    }
    setVehicleData(mockVehicleData)
    setIsTicketModalOpen(true)
  }

  const calculateDuration = (entry: Date, exit: Date) => {
    const diff = exit.getTime() - entry.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  const calculateTotal = (entry: Date, exit: Date, rate: number) => {
    const diff = exit.getTime() - entry.getTime()
    const hours = Math.ceil(diff / 3600000)
    return hours * rate
  }

  const menuItems = [
    { icon: <Home className="h-6 w-6" />, title: "Inicio" },
    { icon: <CarFront className="h-6 w-6" />, title: "Entrada" },
    { icon: <LogOut className="h-6 w-6" />, title: "Salida", active: true },
    { icon: <Search className="h-6 w-6" />, title: "Buscar" },
    { icon: <BarChart className="h-6 w-6" />, title: "Reportes" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 font-sans">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Salida de Vehículo</h1>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <p className="text-sm font-medium">
              {currentDateTime.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center text-2xl font-semibold text-gray-800">
            <Clock className="h-6 w-6 mr-2" />
            <p>
              {currentDateTime.toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt={operatorName} />
            <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">{operatorName}</span>
        </div>
      </header>

      <Card className="mt-6 bg-white shadow-xl">
        <CardHeader className="bg-green-800 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center">
            <LogOut className="h-6 w-6 mr-2" />
            Registrar Salida de Vehículo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Ej: AA-BB-11"
                value={patente}
                onChange={handlePatenteChange}
                className="text-3xl text-center uppercase bg-gray-100 border-2 border-green-300 focus:border-green-500 rounded-lg shadow-inner"
                maxLength={8}
              />
            </div>
            <Button type="submit" className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
              <Timer className="h-5 w-5 mr-2" />
              Calcular Tiempo y Tarifa
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
        <DialogContent className="bg-white rounded-lg shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <DollarSign className="h-6 w-6 mr-2" />
              Ticket de Salida
            </DialogTitle>
          </DialogHeader>
          {vehicleData && (
            <div className="space-y-4 text-gray-700">
              <p className="text-lg"><strong>Patente:</strong> {patente}</p>
              <p><strong>Hora de Entrada:</strong> {vehicleData.entryTime.toLocaleTimeString('es-CL', { hour12: false })}</p>
              <p><strong>Hora de Salida:</strong> {vehicleData.exitTime.toLocaleTimeString('es-CL', { hour12: false })}</p>
              <p><strong>Duración:</strong> {calculateDuration(vehicleData.entryTime, vehicleData.exitTime)}</p>
              <p><strong>Tarifa por Hora:</strong> ${vehicleData.tarifa}</p>
              <p className="text-xl font-bold text-green-800">
                <strong>Total a Pagar:</strong> ${calculateTotal(vehicleData.entryTime, vehicleData.exitTime, vehicleData.tarifa)}
              </p>
              <Button onClick={() => setIsTicketModalOpen(false)} className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
                <Printer className="mr-2 h-5 w-5" />
                Imprimir Ticket y Cobrar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl">
        <div className="flex justify-around p-2">
          {menuItems.map((item) => (
            <Button
              key={item.title}
              variant="ghost"
              className={`flex flex-col items-center ${item.active ? 'text-green-800' : 'text-gray-500'} hover:bg-green-100 rounded-lg transition-colors duration-200`}
            >
              {item.icon}
              <span className="text-xs font-medium mt-1">{item.title}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}

interface VehicleData {
  entryTime: Date;
  exitTime: Date;
  tarifa: number;
}