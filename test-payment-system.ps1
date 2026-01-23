# Test du Système de Paiement MonCash
# PowerShell Script

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🧪 TEST SYSTÈME PAIEMENT MONCASH" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$projectId = "sbovtiakuigihbkjgnmo"
$anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNib3Z0aWFrdWlnaWhia2pnbm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NDk5NjcsImV4cCI6MjA1MTUyNTk2N30.j_0Wo2y_6S5pGKjbNmQlHqDQlIU4iXuSr20gPdoKqYI"
$baseUrl = "https://$projectId.supabase.co"

# Test 1: Health Check
Write-Host "TEST 1: Health Check de l'API" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/functions/v1/payment/health" `
        -Method GET `
        -Headers @{
            "Authorization" = "Bearer $anonKey"
        }
    
    if ($response.status -eq "ok") {
        Write-Host "✅ API Payment est en ligne" -ForegroundColor Green
        Write-Host "   Service: $($response.service)" -ForegroundColor Gray
        Write-Host "   Timestamp: $($response.timestamp)" -ForegroundColor Gray
    } else {
        Write-Host "❌ API ne répond pas correctement" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur Health Check: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Vérifier les tables
Write-Host "TEST 2: Vérification des Tables" -ForegroundColor Yellow
try {
    # Test orders table
    $ordersResponse = Invoke-RestMethod -Uri "$baseUrl/rest/v1/orders?select=count" `
        -Method GET `
        -Headers @{
            "apikey" = $anonKey
            "Authorization" = "Bearer $anonKey"
        }
    Write-Host "✅ Table 'orders' existe et est accessible" -ForegroundColor Green
    
    # Test payments table (need auth)
    Write-Host "⚠️  Table 'payments' requiert authentification (normal)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Erreur tables: $_" -ForegroundColor Red
}

Write-Host ""

# Test 3: Créer une commande test
Write-Host "TEST 3: Création d'une Commande Test" -ForegroundColor Yellow
$testOrder = @{
    amount = 2500
    currency = "HTG"
    items = @(
        @{
            id = "test-1"
            name = "Bouquet Test"
            price = 2500
            currency = "HTG"
            quantity = 1
        }
    )
    customerName = "Jean Test"
    customerEmail = "test@example.com"
    customerPhone = "+509 1234 5678"
} | ConvertTo-Json -Depth 5

try {
    $createResponse = Invoke-RestMethod -Uri "$baseUrl/functions/v1/payment/create" `
        -Method POST `
        -Headers @{
            "Authorization" = "Bearer $anonKey"
            "Content-Type" = "application/json"
        } `
        -Body $testOrder
    
    if ($createResponse.success) {
        Write-Host "✅ Commande créée avec succès!" -ForegroundColor Green
        Write-Host "   Order ID: $($createResponse.orderId)" -ForegroundColor Gray
        Write-Host "   Payment ID: $($createResponse.paymentId)" -ForegroundColor Gray
        
        $testOrderId = $createResponse.orderId
        $testPaymentId = $createResponse.paymentId
        
        Write-Host ""
        
        # Test 4: Vérifier la commande créée
        Write-Host "TEST 4: Récupération de la Commande" -ForegroundColor Yellow
        Start-Sleep -Seconds 1
        
        $getOrderResponse = Invoke-RestMethod -Uri "$baseUrl/functions/v1/payment/order/$testOrderId" `
            -Method GET `
            -Headers @{
                "Authorization" = "Bearer $anonKey"
            }
        
        if ($getOrderResponse.success) {
            Write-Host "✅ Commande récupérée avec succès!" -ForegroundColor Green
            Write-Host "   Client: $($getOrderResponse.order.customer_name)" -ForegroundColor Gray
            Write-Host "   Montant: $($getOrderResponse.order.amount) $($getOrderResponse.order.currency)" -ForegroundColor Gray
            Write-Host "   Statut: $($getOrderResponse.order.status)" -ForegroundColor Gray
        }
        
        Write-Host ""
        
        # Test 5: Simuler paiement réussi
        Write-Host "TEST 5: Simulation Paiement Réussi" -ForegroundColor Yellow
        Start-Sleep -Seconds 1
        
        $callbackData = @{
            orderId = $testOrderId
            transactionId = $testPaymentId
            status = "success"
        } | ConvertTo-Json
        
        $callbackResponse = Invoke-RestMethod -Uri "$baseUrl/functions/v1/payment/callback" `
            -Method POST `
            -Headers @{
                "Authorization" = "Bearer $anonKey"
                "Content-Type" = "application/json"
            } `
            -Body $callbackData
        
        if ($callbackResponse.success -and $callbackResponse.status -eq "paid") {
            Write-Host "✅ Paiement confirmé avec succès!" -ForegroundColor Green
            Write-Host "   Order ID: $($callbackResponse.orderId)" -ForegroundColor Gray
            Write-Host "   Statut: $($callbackResponse.status)" -ForegroundColor Gray
            Write-Host "   Message: $($callbackResponse.message)" -ForegroundColor Gray
        }
        
        Write-Host ""
        
        # Test 6: Vérifier le statut final
        Write-Host "TEST 6: Vérification Statut Final" -ForegroundColor Yellow
        Start-Sleep -Seconds 1
        
        $finalCheck = Invoke-RestMethod -Uri "$baseUrl/rest/v1/orders?id=eq.$testOrderId&select=*" `
            -Method GET `
            -Headers @{
                "apikey" = $anonKey
                "Authorization" = "Bearer $anonKey"
            }
        
        if ($finalCheck[0].status -eq "paid") {
            Write-Host "✅ Statut final confirmé: PAID" -ForegroundColor Green
            Write-Host "   Commande finalisée avec succès!" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Statut: $($finalCheck[0].status)" -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "❌ Erreur création commande" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
    Write-Host "   Détails: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ TESTS TERMINÉS" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour voir toutes les commandes:" -ForegroundColor Yellow
Write-Host "SELECT * FROM orders ORDER BY created_at DESC;" -ForegroundColor Gray
Write-Host ""
Write-Host "Pour voir tous les paiements:" -ForegroundColor Yellow
Write-Host "SELECT * FROM payments ORDER BY created_at DESC;" -ForegroundColor Gray
Write-Host ""
