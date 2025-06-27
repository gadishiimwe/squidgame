
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('User not authenticated')
    }

    const { amount, provider, phone_number, challenge_id } = await req.json()

    // Validate input
    if (!amount || !provider || !phone_number) {
      throw new Error('Missing required fields: amount, provider, phone_number')
    }

    if (!['mtn', 'airtel'].includes(provider)) {
      throw new Error('Invalid provider. Must be mtn or airtel')
    }

    // Create payment record
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        challenge_id,
        amount: parseFloat(amount),
        provider,
        phone_number,
        status: 'pending'
      })
      .select()
      .single()

    if (paymentError) {
      throw paymentError
    }

    // Here you would integrate with actual Mobile Money APIs
    // For now, we'll simulate a successful payment after a delay
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For demo purposes, we'll mark payment as completed
    // In production, this would be done via webhook from the payment provider
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({ 
        status: 'completed', 
        transaction_id: `TXN_${Date.now()}`,
        updated_at: new Date().toISOString()
      })
      .eq('id', payment.id)

    if (updateError) {
      throw updateError
    }

    // Create wallet transaction for successful payment
    const { error: walletError } = await supabaseClient
      .from('wallet_transactions')
      .insert({
        user_id: user.id,
        amount: parseFloat(amount),
        type: 'deposit',
        description: `Mobile Money deposit via ${provider.toUpperCase()}`,
        payment_id: payment.id
      })

    if (walletError) {
      throw walletError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_id: payment.id,
        message: 'Payment processed successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Payment processing error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Payment processing failed' 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
